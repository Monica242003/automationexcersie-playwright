import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class BrowserHelper {
  static browser: Browser;
  static context: BrowserContext;
  static page: Page;

  static async init() {
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 500 // slow mode to ensure video is clear and easy to follow
    });

    // Create a single context and page for the entire test suite run
    // This records all scenarios into a single MP4 video file!
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: {
        dir: 'reports/videos/',
        size: { width: 1280, height: 800 }
      },
      acceptDownloads: true // necessary for TestCase 24: Download Invoice
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
