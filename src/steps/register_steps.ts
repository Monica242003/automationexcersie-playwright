import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
  homePage,
  signupLoginPage,
  signupPage,
  accountCreatedDeletedPage,
  resolveEmail,
  cartPage,
  productDetailPage,
  checkoutPage,
  contactUsPage,
  productsPage
} from './shared_state';
import { envConfig } from '../config/env';
import testData from '../config/testData.json';

Given('I navigate to url {string}', async (url: string) => {
  await homePage.navigateTo(url);
});

Then('Home page is visible successfully', async () => {
  expect(await homePage.page.title()).toContain('Automation Exercise');
});

When(/^I click (?:on )?"([^"]+)" button$/, async (btnText: string) => {
  const cleanedText = btnText.trim();
  switch (cleanedText) {
    case 'Signup':
      await signupLoginPage.click(signupLoginPage.signupButton);
      break;
    case 'Create Account':
      await signupPage.clickCreateAccount();
      break;
    case 'Continue':
      await accountCreatedDeletedPage.clickContinue();
      break;
    case 'login':
      await signupLoginPage.click(signupLoginPage.loginButton);
      break;
    case 'Home':
      await contactUsPage.clickHome();
      break;
    case 'Continue Shopping':
      await productsPage.clickContinueShopping();
      break;
    case 'View Cart':
      await productsPage.clickViewCartFromModal();
      break;
    case 'Add to cart':
      await productDetailPage.clickAddToCart();
      break;
    case 'Pay and Confirm Order':
      await checkoutPage.clickPayAndConfirm();
      break;
    case 'Signup / Login':
      await homePage.clickSignupLogin();
      break;
    case 'Cart':
      await homePage.clickCart();
      break;
    case 'Delete Account':
      await homePage.clickDeleteAccount();
      break;
    case 'Logout':
      await homePage.clickLogout();
      break;
    case 'Products':
      await homePage.clickProducts();
      break;
    case 'Contact Us':
      await homePage.clickContactUs();
      break;
    case 'Test Cases':
      await homePage.clickTestCases();
      break;
    case 'Register / Login':
      await cartPage.clickRegisterLoginOnModal();
      break;
    default:
      const locator = homePage.page.locator(`button:has-text("${cleanedText}"), a:has-text("${cleanedText}")`).first();
      await homePage.click(locator);
  }
});

Then('{string} is visible', async (text: string) => {
  if (text === 'New User Signup!') {
    expect(await signupLoginPage.isNewUserSignupVisible()).toBe(true);
  } else if (text === 'Login to your account') {
    expect(await signupLoginPage.isLoginToYourAccountVisible()).toBe(true);
  } else if (text === 'ENTER ACCOUNT INFORMATION') {
    expect(await signupPage.isEnterAccountInfoVisible()).toBe(true);
  } else if (text === 'ACCOUNT CREATED!') {
    expect(await accountCreatedDeletedPage.isAccountCreatedVisible()).toBe(true);
  } else if (text === 'ACCOUNT DELETED!') {
    expect(await accountCreatedDeletedPage.isAccountDeletedVisible()).toBe(true);
  } else if (text === 'Write Your Review') {
    expect(await productDetailPage.isReviewHeaderVisible()).toBe(true);
  } else {
    await homePage.assertTextVisible(text);
  }
});

When('I enter name {string} and email {string}', async (name: string, email: string) => {
  const resolvedEmail = resolveEmail(email);
  await signupLoginPage.fillSignupForm(name, resolvedEmail);
});

When('I fill user account details and address from testData', async () => {
  const user = testData.user;
  await signupPage.fillAccountDetails({
    title: user.title as 'Mr.' | 'Mrs.',
    name: user.name,
    email: '',
    password: envConfig.defaultPassword,
    day: user.day,
    month: user.month,
    year: user.year,
    newsletter: true,
    optin: true,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company,
    address1: user.address1,
    address2: user.address2,
    country: user.country,
    state: user.state,
    city: user.city,
    zipcode: user.zipcode,
    mobileNumber: user.mobileNumber
  });
});

When('I fill details: Title {string}, Name {string}, Password {string}, Date of birth {string} {string} {string}', 
  async (title: string, name: string, password: string, day: string, month: string, year: string) => {
    await signupPage.fillAccountInformation(title as 'Mr.' | 'Mrs.', password || envConfig.defaultPassword, day, month, year);
});

When('I select checkbox {string}', async (checkboxLabel: string) => {
  if (checkboxLabel === 'Sign up for our newsletter!') {
    await signupPage.checkNewsletter();
  } else if (checkboxLabel === 'Receive special offers from our partners!') {
    await signupPage.checkSpecialOffers();
  }
});

When('I fill address details: First name {string}, Last name {string}, Company {string}, Address {string}, Address2 {string}, Country {string}, State {string}, City {string}, Zipcode {string}, Mobile Number {string}',
  async (firstName: string, lastName: string, company: string, address1: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) => {
    await signupPage.fillAddressDetails(
      firstName,
      lastName,
      company,
      address1,
      address2,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    );
});

Then('Logged in as {string} is visible', async (username: string) => {
  const loggedIn = await homePage.isUserLoggedIn(username);
  expect(loggedIn).toBe(true);
});

Then('error {string} is visible', async (errorMsg: string) => {
  if (errorMsg === 'Your email or password is incorrect!') {
    const text = await signupLoginPage.getLoginErrorMessage();
    expect(text).toContain(errorMsg);
  } else if (errorMsg === 'Email Address already exist!') {
    const text = await signupLoginPage.getSignupErrorMessage();
    expect(text).toContain(errorMsg);
  } else {
    await signupLoginPage.assertTextVisible(errorMsg);
  }
});

When('I register a temporary user {string} with email {string} and password from env',
  async (username: string, email: string) => {
    const resolvedEmail = resolveEmail(email);
    await homePage.navigateTo('http://automationexercise.com/login');
    await signupLoginPage.signup(username, resolvedEmail);
    await signupPage.fillAccountDetails({
      title: 'Mr.',
      name: username,
      email: resolvedEmail,
      password: envConfig.defaultPassword,
      day: '1',
      month: 'January',
      year: '1990',
      newsletter: false,
      optin: false,
      firstName: 'Temp',
      lastName: 'User',
      company: 'TestCorp',
      address1: '123 Test Rd',
      address2: '',
      country: 'United States',
      state: 'Texas',
      city: 'Austin',
      zipcode: '78701',
      mobileNumber: '9999999999'
    });
    await signupPage.clickCreateAccount();
    await accountCreatedDeletedPage.clickContinue();
    await homePage.clickLogout();
});

When('I enter correct email {string} and password from env', async (email: string) => {
  const resolvedEmail = resolveEmail(email);
  await signupLoginPage.fillLoginForm(resolvedEmail, envConfig.defaultPassword);
});

When('I enter incorrect email {string} and wrong password from env', async (email: string) => {
  await signupLoginPage.fillLoginForm(email, envConfig.wrongPassword);
});
