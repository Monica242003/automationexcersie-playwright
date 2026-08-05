import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation Links using Accessible UI Locators
  get signupLoginLink() { return this.page.getByRole('link', { name: 'Signup / Login' }); }
  get contactUsLink() { return this.page.getByRole('link', { name: 'Contact us' }); }
  get productsLink() { return this.page.getByRole('link', { name: 'Products' }); }
  get cartLink() { return this.page.getByRole('link', { name: 'Cart', exact: true }); }
  get testCasesLink() { return this.page.getByRole('link', { name: 'Test Cases', exact: true }); }
  get logoutLink() { return this.page.getByRole('link', { name: 'Logout' }); }
  get deleteAccountLink() { return this.page.getByRole('link', { name: 'Delete Account' }); }
  get loggedInUserText() { return this.page.getByText('Logged in as'); }
  
  // Footer Subscription
  get footerSubscriptionHeader() { return this.page.getByRole('heading', { name: 'Subscription' }); }
  get subscriptionEmailInput() { return this.page.getByPlaceholder('Your email address'); }
  get subscriptionSubmitBtn() { return this.page.locator('#subscribe'); }
  get subscriptionSuccessMsg() { return this.page.locator('.alert-success'); }

  // Recommended Items
  get recommendedItemsHeader() { return this.page.getByRole('heading', { name: 'RECOMMENDED ITEMS' }); }
  get recommendedAddToCartBtn() { return this.page.locator('div#recommended-item-carousel .active .productinfo a.add-to-cart'); }

  async clickSignupLogin() {
    await this.click(this.signupLoginLink);
  }

  async clickContactUs() {
    await this.click(this.contactUsLink);
  }

  async clickProducts() {
    await this.click(this.productsLink);
  }

  async clickCart() {
    await this.click(this.cartLink);
  }

  async clickTestCases() {
    await this.click(this.testCasesLink);
  }

  async clickLogout() {
    await this.click(this.logoutLink);
  }

  async clickDeleteAccount() {
    await this.click(this.deleteAccountLink);
  }

  async isUserLoggedIn(username: string): Promise<boolean> {
    const text = await this.getText(this.loggedInUserText);
    return text.includes(username);
  }

  async scrollDownToFooter() {
    await this.scrollToElement(this.footerSubscriptionHeader);
  }

  async isSubscriptionHeaderVisible(): Promise<boolean> {
    return this.isVisible(this.footerSubscriptionHeader);
  }

  async subscribeEmail(email: string) {
    await this.fill(this.subscriptionEmailInput, email);
    await this.click(this.subscriptionSubmitBtn);
  }

  async getSubscriptionSuccessMessage(): Promise<string> {
    return this.getText(this.subscriptionSuccessMsg);
  }

  async isRecommendedItemsVisible(): Promise<boolean> {
    await this.scrollToElement(this.recommendedItemsHeader);
    return this.isVisible(this.recommendedItemsHeader);
  }

  async addRecommendedProductToCart() {
    const locator = this.recommendedAddToCartBtn.first();
    await this.click(locator);
  }
}
