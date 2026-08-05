import { BasePage } from './BasePage';

export interface AccountDetails {
  title: 'Mr.' | 'Mrs.';
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  newsletter: boolean;
  optin: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class SignupPage extends BasePage {
  get enterAccountInfoHeader() { return this.page.getByRole('heading', { name: 'Enter Account Information' }); }
  
  // Radio
  get genderMrRadio() { return this.page.getByLabel('Mr.'); }
  get genderMrsRadio() { return this.page.getByLabel('Mrs.'); }
  
  // Inputs & Selects
  get passwordInput() { return this.page.getByLabel('Password *'); }
  get daySelect() { return this.page.locator('#days'); }
  get monthSelect() { return this.page.locator('#months'); }
  get yearSelect() { return this.page.locator('#years'); }
  
  // Checkboxes
  get newsletterCheckbox() { return this.page.getByLabel('Sign up for our newsletter!'); }
  get optinCheckbox() { return this.page.getByLabel('Receive special offers from our partners!'); }
  
  // Address info with accessible Locators (exact matching to avoid strict mode violations)
  get firstNameInput() { return this.page.getByRole('textbox', { name: 'First name *' }); }
  get lastNameInput() { return this.page.getByRole('textbox', { name: 'Last name *' }); }
  get companyInput() { return this.page.getByRole('textbox', { name: 'Company', exact: true }); }
  get address1Input() { return this.page.locator('#address1'); }
  get address2Input() { return this.page.locator('#address2'); }
  get countrySelect() { return this.page.locator('#country'); }
  get stateInput() { return this.page.getByRole('textbox', { name: 'State *' }); }
  get cityInput() { return this.page.getByRole('textbox', { name: 'City *' }); }
  get zipcodeInput() { return this.page.locator('#zipcode'); }
  get mobileNumberInput() { return this.page.getByRole('textbox', { name: 'Mobile Number *' }); }
  
  get createAccountBtn() { return this.page.getByRole('button', { name: 'Create Account' }); }

  async isEnterAccountInfoVisible(): Promise<boolean> {
    return this.isVisible(this.enterAccountInfoHeader);
  }

  async fillAccountInformation(title: 'Mr.' | 'Mrs.', password: string, day: string, month: string, year: string) {
    if (title === 'Mr.') {
      await this.click(this.genderMrRadio);
    } else {
      await this.click(this.genderMrsRadio);
    }
    await this.fill(this.passwordInput, password);
    await this.selectOption(this.daySelect, day);
    await this.selectOption(this.monthSelect, month);
    await this.selectOption(this.yearSelect, year);
  }

  async checkNewsletter() {
    await this.check(this.newsletterCheckbox);
  }

  async checkSpecialOffers() {
    await this.check(this.optinCheckbox);
  }

  async fillAddressDetails(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
  ) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.companyInput, company);
    await this.fill(this.address1Input, address1);
    await this.fill(this.address2Input, address2);
    await this.selectOption(this.countrySelect, country);
    await this.fill(this.stateInput, state);
    await this.fill(this.cityInput, city);
    await this.fill(this.zipcodeInput, zipcode);
    await this.fill(this.mobileNumberInput, mobileNumber);
  }

  async fillAccountDetails(details: AccountDetails) {
    await this.fillAccountInformation(details.title, details.password, details.day, details.month, details.year);
    if (details.newsletter) {
      await this.checkNewsletter();
    }
    if (details.optin) {
      await this.checkSpecialOffers();
    }
    await this.fillAddressDetails(
      details.firstName,
      details.lastName,
      details.company,
      details.address1,
      details.address2,
      details.country,
      details.state,
      details.city,
      details.zipcode,
      details.mobileNumber
    );
  }

  async clickCreateAccount() {
    await this.click(this.createAccountBtn);
  }
}
