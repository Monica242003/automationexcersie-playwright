import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  homePage,
  signupLoginPage,
  productsPage,
  productDetailPage,
  cartPage,
  checkoutPage,
  contactUsPage,
  resolveEmail
} from './shared_state';
import { envConfig } from '../config/env';
import testData from '../config/testData.json';

// Login / Logout / Session
When('I enter correct email {string} and password {string}', async (email: string, password: string) => {
  const resolvedEmail = resolveEmail(email);
  await signupLoginPage.fillLoginForm(resolvedEmail, password || envConfig.defaultPassword);
});

When('I enter incorrect email {string} and password {string}', async (email: string, password: string) => {
  await signupLoginPage.fillLoginForm(email, password || envConfig.wrongPassword);
});

Then('User is navigated to login page', async () => {
  expect(await homePage.page.url()).toContain('/login');
});

// Contact Us
When('I enter name {string}, email {string}, subject {string} and message {string}', 
  async (name: string, email: string, subject: string, message: string) => {
    await contactUsPage.fillForm(name, email, subject, message);
});

When('I upload file {string}', async (filePath: string) => {
  await contactUsPage.uploadFileToForm(filePath);
});

When('I click {string} button and accept dialog', async (btnText: string) => {
  if (btnText === 'Submit') {
    await contactUsPage.clickSubmitWithDialogAccept();
  }
});

Then('success message {string} is visible', async (expectedMsg: string) => {
  if (expectedMsg.includes('submitted')) {
    const text = await contactUsPage.getSuccessMessage();
    expect(text).toContain(expectedMsg);
  } else if (expectedMsg.includes('placed')) {
    try {
      await checkoutPage.assertTextVisible(expectedMsg);
    } catch {
      await checkoutPage.assertTextVisible('order has been confirmed');
    }
  } else {
    await homePage.assertTextVisible(expectedMsg);
  }
});

Then('User is landed to home page successfully', async () => {
  expect(await homePage.page.url()).toBe('https://automationexercise.com/');
});

// Test Cases Page
Then('User is navigated to test cases page successfully', async () => {
  expect(await homePage.page.url()).toContain('/test_cases');
});

// Products & Search
Then('User is navigated to ALL PRODUCTS page successfully', async () => {
  expect(await homePage.page.url()).toContain('/products');
  expect(await productsPage.isAllProductsVisible()).toBe(true);
});

Then('The products list is visible', async () => {
  expect(await productsPage.isProductListVisible()).toBe(true);
});

When('I search product from testData', async () => {
  await productsPage.searchProduct(testData.products.searchItem);
});

When('I click on "View Product" of first product', async () => {
  await productsPage.clickFirstProductViewDetails();
});

When('I enter product name {string} in search input and click search button', async (productName: string) => {
  await productsPage.searchProduct(productName);
});

Then('Verify all the products related to search are visible', async () => {
  const valid = await productsPage.verifyProductsRelatedToSearch(testData.products.searchItem);
  expect(valid).toBe(true);
});

// Cart & Add Operations
Then('Verify cart page is displayed', async () => {
  expect(await cartPage.isCartPageVisible()).toBe(true);
});

When(/^I hover over (first|second) product and click "Add to cart"$/, async (productRank: string) => {
  const index = productRank === 'second' ? 1 : 0;
  await productsPage.addProductToCartByIndex(index);
});

Then('Verify both products are added to Cart', async () => {
  const count = await cartPage.getCartItemsCount();
  expect(count).toBeGreaterThanOrEqual(2);
});

Then('Verify their prices, quantity and total price', async () => {
  const item1 = await cartPage.getCartItemDetails(0);
  const item2 = await cartPage.getCartItemDetails(1);

  expect(item1.price).not.toBe('');
  expect(item1.quantity).toBe('1');
  expect(item2.price).not.toBe('');
  expect(item2.quantity).toBe('1');
});

Then('Verify product detail is opened', async () => {
  expect(await productDetailPage.isProductDetailsVisible()).toBe(true);
});

When('I increase quantity to 4', async () => {
  await productDetailPage.setQuantity(4);
});

Then('Verify that product is displayed in cart page with exact quantity {string}', async (expectedQty: string) => {
  const item = await cartPage.getCartItemDetails(0);
  expect(item.quantity).toBe(expectedQty);
});

When('I click {string} button corresponding to particular product', async (btn: string) => {
  await cartPage.deleteProductFromCart(0);
});

Then('Verify that product is removed from the cart', async () => {
  const isEmpty = await cartPage.isCartEmpty();
  const count = await cartPage.getCartItemsCount();
  expect(isEmpty || count === 0).toBe(true);
});

// Checkout and Ordering
When('I click Proceed To Checkout', async () => {
  await cartPage.clickProceedToCheckout();
});

Then('Verify Address Details and Review Your Order', async () => {
  const deliv = await checkoutPage.getDeliveryAddressText();
  const bill = await checkoutPage.getBillingAddressText();
  const hasUser = deliv.includes(testData.user.name) || deliv.includes(testData.user.address1);
  const hasCheckout = deliv.includes('Checkout User') || deliv.includes('456 Order Ln');
  expect(hasUser || hasCheckout).toBe(true);
  expect(bill.length).toBeGreaterThan(0);
});

When('I enter order comment from testData and click {string}', async (btn: string) => {
  await checkoutPage.enterComment(testData.order.comment);
  await checkoutPage.clickPlaceOrder();
});

When('I enter description {string} in comment text area and click {string}', async (comment: string, btn: string) => {
  await checkoutPage.enterComment(comment);
  await checkoutPage.clickPlaceOrder();
});

When('I enter payment details from environment configuration', async () => {
  await checkoutPage.fillPaymentDetails(
    testData.user.name,
    envConfig.cardNumber,
    envConfig.cardCvc,
    envConfig.cardExpMonth,
    envConfig.cardExpYear
  );
});

When('I enter payment details: Name on Card {string}, Card Number {string}, CVC {string}, Expiration Month {string}, Expiration Year {string}', 
  async (name: string, num: string, cvc: string, expM: string, expY: string) => {
    await checkoutPage.fillPaymentDetails(
      name,
      num || envConfig.cardNumber,
      cvc || envConfig.cardCvc,
      expM || envConfig.cardExpMonth,
      expY || envConfig.cardExpYear
    );
});

When('I click {string} button and verify invoice is downloaded successfully', async (btn: string) => {
  const downloadedPath = await checkoutPage.downloadInvoice();
  expect(downloadedPath.toLowerCase()).toContain('invoice');
});

// Review Product
When('I submit review details from testData', async () => {
  await productDetailPage.submitReview(
    testData.review.reviewerName,
    testData.review.reviewerEmail,
    testData.review.reviewText
  );
});

When('I enter name {string}, email {string} and review {string}', async (name: string, email: string, text: string) => {
  await productDetailPage.submitReview(name, email, text);
});

When('I click {string} review button', async (btn: string) => {
  // Handled in submitReview
});

Then('review success message {string} is visible', async (expectedMsg: string) => {
  const text = await productDetailPage.getReviewSuccessMessage();
  expect(text).toContain(expectedMsg);
});
