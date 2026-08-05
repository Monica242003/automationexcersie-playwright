import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  get productInfoBlock() { return this.page.locator('.product-information'); }
  get productName() { return this.page.locator('.product-information h2'); }
  get productCategory() { return this.page.locator('.product-information p:has-text("Category:")'); }
  get productPrice() { return this.page.locator('.product-information span span'); }
  get productAvailability() { return this.page.locator('.product-information p:has-text("Availability:")'); }
  get productCondition() { return this.page.locator('.product-information p:has-text("Condition:")'); }
  get productBrand() { return this.page.locator('.product-information p:has-text("Brand:")'); }

  // Quantity and Add to Cart
  get quantityInput() { return this.page.locator('#quantity'); }
  get addToCartBtn() { return this.page.getByRole('button', { name: 'Add to cart' }); }

  // Review
  get reviewHeader() { return this.page.getByRole('link', { name: 'Write Your Review' }); }
  get reviewNameInput() { return this.page.getByPlaceholder('Your Name'); }
  get reviewEmailInput() { return this.page.getByPlaceholder('Email Address', { exact: true }); }
  get reviewTextInput() { return this.page.getByPlaceholder('Add Review Here!'); }
  get reviewSubmitBtn() { return this.page.getByRole('button', { name: 'Submit' }); }
  get reviewSuccessMsg() { return this.page.locator('#review-section div.alert-success'); }

  async isProductDetailsVisible(): Promise<boolean> {
    return this.isVisible(this.productInfoBlock);
  }

  async getProductDetails(): Promise<{
    name: string;
    category: string;
    price: string;
    availability: string;
    condition: string;
    brand: string;
  }> {
    return {
      name: await this.getText(this.productName),
      category: await this.getText(this.productCategory),
      price: await this.getText(this.productPrice),
      availability: await this.getText(this.productAvailability),
      condition: await this.getText(this.productCondition),
      brand: await this.getText(this.productBrand)
    };
  }

  async setQuantity(qty: number) {
    await this.fill(this.quantityInput, qty.toString());
  }

  async clickAddToCart() {
    await this.click(this.addToCartBtn);
  }

  async isReviewHeaderVisible(): Promise<boolean> {
    return this.isVisible(this.reviewHeader);
  }

  async submitReview(name: string, email: string, reviewText: string) {
    await this.fill(this.reviewNameInput, name);
    await this.fill(this.reviewEmailInput, email);
    await this.fill(this.reviewTextInput, reviewText);
    await this.click(this.reviewSubmitBtn);
  }

  async getReviewSuccessMessage(): Promise<string> {
    await this.reviewSuccessMsg.first().waitFor({ state: 'visible' });
    return this.getText(this.reviewSuccessMsg);
  }
}
