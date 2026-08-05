import * as dotenv from 'dotenv';
dotenv.config();
import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { BrowserHelper } from './browser-helper';
import { cursorTrackerScript } from './cursor-tracker';
import { initPages, clearResolvedEmails } from '../steps/shared_state';
import * as fs from 'fs';
import * as path from 'path';

// Set default timeout for cucumber steps (e.g. 120 seconds because of slowMo and slow server responses)
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(120000);

BeforeAll(async () => {
  // Ensure report directories exist
  const dirs = ['reports/videos', 'reports/traces', 'reports/screenshots'];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  await BrowserHelper.init();

  // Route interceptor to block all Google Ads and distracting trackers
  // which can cause significant flakiness on automationexercise.com
  await BrowserHelper.context.route('**/*', (route) => {
    const url = route.request().url();
    if (
      url.includes('googleads') ||
      url.includes('doubleclick') ||
      url.includes('google-analytics') ||
      url.includes('adservice') ||
      url.includes('pagead2') ||
      url.includes('googlesyndication') ||
      url.includes('adnxs') ||
      url.includes('quantserve') ||
      url.includes('facebook')
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });

  // Inject visual cursor tracker
  await BrowserHelper.page.addInitScript(cursorTrackerScript);
});

AfterAll(async () => {
  await BrowserHelper.closeBrowser();
});

Before(async () => {
  // Clear cookies and web storage for state isolation between scenarios
  await BrowserHelper.context.clearCookies();
  try {
    await BrowserHelper.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  } catch (e) {
    // ignore if browser is on blank page
  }

  // Start tracing for this scenario
  await BrowserHelper.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  // Clear resolved email memory for this scenario run
  clearResolvedEmails();

  // Initialize POM instances with the active page reference
  initPages();
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = Date.now();

  // If scenario failed, take a screenshot and dump HTML source
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${scenarioName}-${timestamp}.png`;
    const screenshot = await BrowserHelper.page.screenshot({ path: screenshotPath });
    this.attach(screenshot, 'image/png');

    try {
      const html = await BrowserHelper.page.content();
      fs.writeFileSync(`reports/screenshots/${scenarioName}-${timestamp}.html`, html, 'utf-8');
    } catch (e) {
      // ignore
    }
  }

  // Stop tracing and save for this scenario
  const tracePath = path.resolve(`reports/traces/${scenarioName}-${timestamp}.zip`);
  await BrowserHelper.context.tracing.stop({ path: tracePath });
});
