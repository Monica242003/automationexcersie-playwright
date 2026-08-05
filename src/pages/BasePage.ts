import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BrowserHelper } from '../support/browser-helper';
import * as path from 'path';

export class BasePage {
  constructor(public page: Page = BrowserHelper.page) {}

  async navigateTo(url: string) {
    for (let i = 0; i < 3; i++) {
      try {
        await this.page.goto(url, { waitUntil: 'load', timeout: 35000 });
        const title = await this.page.title();
        if (!title.includes('522') && !title.includes('Connection timed out') && !title.includes('Timed out')) {
          return;
        }
      } catch (err) {
        if (i === 2) throw err;
      }
      await this.page.waitForTimeout(3000);
    }
  }

  async getLocator(selectorOrLocator: string | Locator): Promise<Locator> {
    if (typeof selectorOrLocator === 'string') {
      return this.page.locator(selectorOrLocator);
    }
    return selectorOrLocator;
  }

  async click(selectorOrLocator: string | Locator) {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
    await locator.click();
  }

  async fill(selectorOrLocator: string | Locator, value: string) {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
    await locator.fill(value);
  }

  async selectOption(selectorOrLocator: string | Locator, value: string) {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  async check(selectorOrLocator: string | Locator) {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible' });
    if (!(await locator.isChecked())) {
      await locator.hover();
      await locator.check();
    }
  }

  async uncheck(selectorOrLocator: string | Locator) {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible' });
    if (await locator.isChecked()) {
      await locator.hover();
      await locator.uncheck();
    }
  }

  async uploadFile(selectorOrLocator: string | Locator, relativeFilePath: string) {
    const locator = await this.getLocator(selectorOrLocator);
    const absolutePath = path.resolve(relativeFilePath);
    await locator.setInputFiles(absolutePath);
  }

  async scrollDown() {
    await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
    // Wait for scroll animation/rendering
    await this.page.waitForTimeout(500);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(800);
  }

  async scrollToElement(selectorOrLocator: string | Locator) {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  async getText(selectorOrLocator: string | Locator): Promise<string> {
    const locator = await this.getLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible' });
    return (await locator.innerText()).trim();
  }

  async isVisible(selectorOrLocator: string | Locator): Promise<boolean> {
    try {
      const locator = await this.getLocator(selectorOrLocator);
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  async handleDialog(action: 'accept' | 'dismiss' = 'accept') {
    this.page.once('dialog', async (dialog) => {
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  async assertTextVisible(text: string) {
    await expect(this.page.locator(`text=${text}`).first()).toBeVisible({ timeout: 25000 });
  }

  async assertTextNotVisible(text: string) {
    await expect(this.page.locator(`text=${text}`).first()).not.toBeVisible({ timeout: 25000 });
  }
}
