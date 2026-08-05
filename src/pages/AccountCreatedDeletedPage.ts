import { BasePage } from './BasePage';

export class AccountCreatedDeletedPage extends BasePage {
  get accountCreatedHeader() { return this.page.getByText('ACCOUNT CREATED!'); }
  get accountDeletedHeader() { return this.page.getByText('ACCOUNT DELETED!'); }
  get continueButton() { return this.page.getByRole('link', { name: 'Continue' }); }

  async isAccountCreatedVisible(): Promise<boolean> {
    return this.isVisible(this.accountCreatedHeader);
  }

  async isAccountDeletedVisible(): Promise<boolean> {
    return this.isVisible(this.accountDeletedHeader);
  }

  async clickContinue() {
    await this.click(this.continueButton);
  }
}
