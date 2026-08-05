import { BasePage } from './BasePage';

export class SignupLoginPage extends BasePage {
  // Signup UI Locators
  get signupHeader() { return this.page.getByRole('heading', { name: 'New User Signup!' }); }
  get signupNameInput() { return this.page.getByPlaceholder('Name'); }
  get signupEmailInput() { return this.page.locator('form[action="/signup"]').getByPlaceholder('Email Address'); }
  get signupButton() { return this.page.getByRole('button', { name: 'Signup' }); }

  // Login UI Locators
  get loginHeader() { return this.page.getByRole('heading', { name: 'Login to your account' }); }
  get loginEmailInput() { return this.page.locator('form[action="/login"]').getByPlaceholder('Email Address'); }
  get loginPasswordInput() { return this.page.getByPlaceholder('Password'); }
  get loginButton() { return this.page.getByRole('button', { name: 'Login' }); }

  // Error Messages
  get loginErrorMessage() { return this.page.locator('form[action="/login"]').getByText('Your email or password is incorrect!'); }
  get signupErrorMessage() { return this.page.locator('form[action="/signup"]').getByText('Email Address already exist!'); }

  async isNewUserSignupVisible(): Promise<boolean> {
    return this.isVisible(this.signupHeader);
  }

  async isLoginToYourAccountVisible(): Promise<boolean> {
    return this.isVisible(this.loginHeader);
  }

  async fillSignupForm(name: string, email: string) {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
  }

  async fillLoginForm(email: string, password: string) {
    await this.fill(this.loginEmailInput, email);
    await this.fill(this.loginPasswordInput, password);
  }

  async signup(name: string, email: string) {
    await this.fillSignupForm(name, email);
    await this.click(this.signupButton);
  }

  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.click(this.loginButton);
  }

  async getLoginErrorMessage(): Promise<string> {
    return this.getText(this.loginErrorMessage);
  }

  async getSignupErrorMessage(): Promise<string> {
    return this.getText(this.signupErrorMessage);
  }
}
