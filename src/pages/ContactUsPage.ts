import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  get getInTouchHeader() { return this.page.getByRole('heading', { name: 'Get In Touch' }); }
  get nameInput() { return this.page.getByPlaceholder('Name'); }
  get emailInput() { return this.page.getByPlaceholder('Email', { exact: true }); }
  get subjectInput() { return this.page.getByPlaceholder('Subject'); }
  get messageInput() { return this.page.getByPlaceholder('Your Message Here'); }
  get fileUploadInput() { return this.page.locator('input[name="upload_file"]'); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }
  
  get successMsg() { return this.page.locator('div.status.alert-success'); }
  get homeBtn() { return this.page.getByRole('link', { name: 'Home' }); }

  async isGetInTouchVisible(): Promise<boolean> {
    return this.isVisible(this.getInTouchHeader);
  }

  async fillForm(name: string, email: string, subject: string, message: string) {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.fill(this.subjectInput, subject);
    await this.fill(this.messageInput, message);
  }

  async uploadFileToForm(relativeFilePath: string) {
    await this.uploadFile(this.fileUploadInput, relativeFilePath);
  }

  async clickSubmitWithDialogAccept() {
    await this.handleDialog('accept');
    await this.click(this.submitButton);
  }

  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMsg);
  }

  async clickHome() {
    await this.click(this.homeBtn);
  }
}
