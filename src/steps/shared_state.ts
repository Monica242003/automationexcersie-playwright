import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountCreatedDeletedPage } from '../pages/AccountCreatedDeletedPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { BrowserHelper } from '../support/browser-helper';
import { envConfig } from '../config/env';

export let homePage: HomePage;
export let signupLoginPage: SignupLoginPage;
export let signupPage: SignupPage;
export let accountCreatedDeletedPage: AccountCreatedDeletedPage;
export let contactUsPage: ContactUsPage;
export let productsPage: ProductsPage;
export let productDetailPage: ProductDetailPage;
export let cartPage: CartPage;
export let checkoutPage: CheckoutPage;

export let lastGeneratedEmail = '';

export function initPages() {
  const page = BrowserHelper.page;
  homePage = new HomePage(page);
  signupLoginPage = new SignupLoginPage(page);
  signupPage = new SignupPage(page);
  accountCreatedDeletedPage = new AccountCreatedDeletedPage(page);
  contactUsPage = new ContactUsPage(page);
  productsPage = new ProductsPage(page);
  productDetailPage = new ProductDetailPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
}

export const resolvedEmailsMap = new Map<string, string>();

export function clearResolvedEmails() {
  resolvedEmailsMap.clear();
}

export function resolveEmail(email: string): string {
  if (email.includes('_')) {
    if (resolvedEmailsMap.has(email)) {
      return resolvedEmailsMap.get(email)!;
    }
    const parts = email.split('@');
    const prefixPart = parts[0].replace('_', '');
    const domainPart = parts[1] || envConfig.emailDomain;
    const uniqueEmail = `${prefixPart}_${Date.now()}@${domainPart}`;
    resolvedEmailsMap.set(email, uniqueEmail);
    return uniqueEmail;
  }
  return email;
}
