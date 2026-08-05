import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class BrowserHelper {
  static browser: Browser;
  static context: BrowserContext;
  static page: Page;

  static async init() {
    const isCI = process.env.CI === 'true' || process.env.HEADLESS === 'true';
    this.browser = await chromium.launch({
      headless: isCI,
      slowMo: isCI ? 0 : 500 // 500ms slowMo locally for visual demo, 0ms in CI for maximum speed
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: {
        dir: 'reports/videos/',
        size: { width: 1280, height: 800 }
      },
      acceptDownloads: true
    });

    this.page = await this.context.newPage();
    this.page.setDefaultNavigationTimeout(60000);
    this.page.setDefaultTimeout(60000);
  }

  static async closeBrowser() {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}
