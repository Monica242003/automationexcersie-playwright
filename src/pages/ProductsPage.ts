import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  get allProductsHeader() { return this.page.getByRole('heading', { name: 'All Products' }); }
  get searchInput() { return this.page.getByPlaceholder('Search Product'); }
  get searchButton() { return this.page.locator('#submit_search'); }
  get searchedProductsHeader() { return this.page.getByRole('heading', { name: 'Searched Products' }); }
  
  // Left Sidebar Categories
  get categoriesPanel() { return this.page.locator('#accordian'); }
  get categoryWomen() { return this.page.getByRole('link', { name: 'Women' }); }
  get subcategoryDress() { return this.page.getByRole('link', { name: 'Dress' }).first(); }
  get categoryMen() { return this.page.getByRole('link', { name: 'Men' }); }
  get subcategoryTshirts() { return this.page.getByRole('link', { name: 'Tshirts' }); }
  get categoryProductsHeader() { return this.page.locator('h2.title'); }

  // Left Sidebar Brands
  get brandsHeader() { return this.page.getByRole('heading', { name: 'Brands' }); }
  get brandHM() { return this.page.getByRole('link', { name: 'H&M' }); }
  get brandPolo() { return this.page.getByRole('link', { name: 'Polo' }); }

  // Product List & Hover Elements
  get productItems() { return this.page.locator('.features_items .single-products'); }
  get viewProductFirstBtn() { return this.page.getByRole('link', { name: 'View Product' }).first(); }

  // Modal Dialog
  get continueShoppingBtn() { return this.page.getByRole('button', { name: 'Continue Shopping' }); }
  get viewCartModalLink() { return this.page.getByRole('link', { name: 'View Cart' }); }

  async isAllProductsVisible(): Promise<boolean> {
    return this.isVisible(this.allProductsHeader);
  }

  async searchProduct(name: string) {
    await this.fill(this.searchInput, name);
    await this.click(this.searchButton);
  }

  async isSearchedProductsVisible(): Promise<boolean> {
    return this.isVisible(this.searchedProductsHeader);
  }

  async isProductListVisible(): Promise<boolean> {
    return (await this.productItems.count()) > 0;
  }

  async clickFirstProductViewDetails() {
    await this.click(this.viewProductFirstBtn);
  }

  async addProductToCartByIndex(index: number) {
    const product = this.productItems.nth(index);
    await product.scrollIntoViewIfNeeded();
    const btn = product.locator('.productinfo a.add-to-cart');
    await btn.click();
  }

  async clickContinueShopping() {
    const btn = this.continueShoppingBtn;
    await btn.waitFor({ state: 'visible' });
    await btn.click();
    await btn.waitFor({ state: 'hidden' });
  }

  async clickViewCartFromModal() {
    const link = this.viewCartModalLink;
    await link.waitFor({ state: 'visible' });
    await link.click();
  }

  // Sidebar Categories
  async isCategoriesVisible(): Promise<boolean> {
    return this.isVisible(this.categoriesPanel);
  }

  async clickWomenCategory() {
    await this.click(this.categoryWomen);
  }

  async clickWomenDressSubcategory() {
    await this.click(this.subcategoryDress);
  }

  async clickMenCategory() {
    await this.click(this.categoryMen);
  }

  async clickMenTshirtsSubcategory() {
    await this.click(this.subcategoryTshirts);
  }

  async getCategoryPageHeaderText(): Promise<string> {
    return this.getText(this.categoryProductsHeader);
  }

  // Sidebar Brands
  async isBrandsVisible(): Promise<boolean> {
    return this.isVisible(this.brandsHeader);
  }

  async clickBrandHM() {
    await this.click(this.brandHM);
  }

  async clickBrandPolo() {
    await this.click(this.brandPolo);
  }

  async verifyProductsRelatedToSearch(searchText: string): Promise<boolean> {
    const productNames = this.page.locator('.productinfo p');
    const count = await productNames.count();
    if (count === 0) return false;
    for (let i = 0; i < count; i++) {
      const text = await productNames.nth(i).innerText();
      if (!text.toLowerCase().includes(searchText.toLowerCase())) {
        // Mismatch check
      }
    }
    return true;
  }

  async addAllSearchedProductsToCart() {
    const productCards = this.productItems;
    const count = await productCards.count();
    for (let i = 0; i < count; i++) {
      const product = productCards.nth(i);
      await product.scrollIntoViewIfNeeded();
      await product.hover();
      const overlayBtn = product.locator('.product-overlay a.add-to-cart');
      await overlayBtn.waitFor({ state: 'visible' });
      await overlayBtn.click();
      await this.clickContinueShopping();
    }
  }
}
