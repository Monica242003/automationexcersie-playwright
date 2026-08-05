import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Address Verification
  get deliveryAddressBlock() { return this.page.locator('#address_delivery'); }
  get billingAddressBlock() { return this.page.locator('#address_invoice'); }
  
  // Comments
  get commentTextArea() { return this.page.locator('textarea[name="message"]'); }
  get placeOrderBtn() { return this.page.getByRole('link', { name: 'Place Order' }); }

  // Payment Form with Accessible Locators
  get nameOnCardInput() { return this.page.locator('input[name="name_on_card"]'); }
  get cardNumberInput() { return this.page.locator('input[name="card_number"]'); }
  get cvcInput() { return this.page.getByPlaceholder('ex. 311'); }
  get expiryMonthInput() { return this.page.getByPlaceholder('MM'); }
  get expiryYearInput() { return this.page.getByPlaceholder('YYYY'); }
  get payAndConfirmBtn() { return this.page.getByRole('button', { name: 'Pay and Confirm Order' }); }

  // Order Confirmation
  get orderPlacedHeader() { return this.page.getByText('ORDER PLACED!'); }
  get downloadInvoiceBtn() { return this.page.getByRole('link', { name: 'Download Invoice' }); }
  get continueBtn() { return this.page.getByRole('link', { name: 'Continue' }); }

  async getDeliveryAddressText(): Promise<string> {
    return this.getText(this.deliveryAddressBlock);
  }

  async getBillingAddressText(): Promise<string> {
    return this.getText(this.billingAddressBlock);
  }

  async enterComment(comment: string) {
    await this.fill(this.commentTextArea, comment);
  }

  async clickPlaceOrder() {
    await this.click(this.placeOrderBtn);
  }

  async fillPaymentDetails(name: string, cardNumber: string, cvc: string, expMonth: string, expYear: string) {
    await this.fill(this.nameOnCardInput, name);
    await this.fill(this.cardNumberInput, cardNumber);
    await this.fill(this.cvcInput, cvc);
    await this.fill(this.expiryMonthInput, expMonth);
    await this.fill(this.expiryYearInput, expYear);
  }

  async clickPayAndConfirm() {
    await this.click(this.payAndConfirmBtn);
  }

  async isOrderPlacedVisible(): Promise<boolean> {
    return this.isVisible(this.orderPlacedHeader);
  }

  async downloadInvoice(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.click(this.downloadInvoiceBtn);
    const download = await downloadPromise;
    const path = `reports/${download.suggestedFilename()}`;
    await download.saveAs(path);
    return path;
  }

  async clickContinue() {
    await this.click(this.continueBtn);
  }
}
