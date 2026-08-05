import { BasePage } from './BasePage';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: string;
  totalPrice: string;
}

export class CartPage extends BasePage {
  get cartTable() { return this.page.locator('#cart_info_table'); }
  get cartRows() { return this.page.locator('#cart_info_table tbody tr'); }
  get proceedToCheckoutBtn() { return this.page.getByText('Proceed To Checkout'); }
  
  // Checkout Modal Warning (for guests)
  get checkoutModal() { return this.page.locator('#checkoutModal'); }
  get registerLoginModalBtn() { return this.page.locator('#checkoutModal').getByRole('link', { name: 'Register / Login' }); }

  async isCartPageVisible(): Promise<boolean> {
    const isTableVisible = await this.isVisible(this.cartTable);
    const isEmptyCartVisible = await this.isVisible(this.page.getByText('Cart is empty!'));
    return isTableVisible || isEmptyCartVisible;
  }

  async clickProceedToCheckout() {
    await this.click(this.proceedToCheckoutBtn);
  }

  async clickRegisterLoginOnModal() {
    await this.click(this.registerLoginModalBtn);
  }

  async getCartItemsCount(): Promise<number> {
    const locator = this.cartRows;
    if (await locator.first().isVisible().catch(() => false)) {
      return await locator.count();
    }
    return 0;
  }

  async getCartItemDetails(index: number): Promise<CartItem> {
    const row = this.cartRows.nth(index);
    const idAttr = await row.getAttribute('id') || '';
    const id = idAttr.replace('product-', '');
    const name = await row.locator('.cart_description h4 a').innerText();
    const price = await row.locator('.cart_price p').innerText();
    const quantity = await row.locator('.cart_quantity button').innerText();
    const totalPrice = await row.locator('.cart_total_price').innerText();

    return {
      id,
      name: name.trim(),
      price: price.trim(),
      quantity: quantity.trim(),
      totalPrice: totalPrice.trim()
    };
  }

  async deleteProductFromCart(index: number) {
    const row = this.cartRows.nth(index);
    const deleteBtn = row.locator('.cart_quantity_delete');
    await deleteBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async isCartEmpty(): Promise<boolean> {
    return this.isVisible(this.page.getByText('Cart is empty!'));
  }
}
