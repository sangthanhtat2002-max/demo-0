export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.pageTitle        = '.title';
    this.inventoryItems   = '.inventory_item';
    this.addToCartBtn     = '[data-test^="add-to-cart"]';
    this.cartBadge        = '.shopping_cart_badge';
    this.sortDropdown     = '[data-test="product-sort-container"]';
    this.itemNames        = '.inventory_item_name';
    this.menuBtn          = '#react-burger-menu-btn';
    this.logoutLink       = '#logout_sidebar_link';
  }

  // Lấy title trang
  getTitle() {
    return this.page.locator(this.pageTitle);
  }

  // Lấy tất cả sản phẩm
  getInventoryItems() {
    return this.page.locator(this.inventoryItems);
  }

  // Thêm sản phẩm đầu tiên vào giỏ
  async addFirstItemToCart() {
    await this.page.locator(this.addToCartBtn).first().click();
  }

  // Lấy số trên badge giỏ hàng
  getCartBadge() {
    return this.page.locator(this.cartBadge);
  }

  // Sắp xếp sản phẩm
  async sortBy(option) {
    await this.page.locator(this.sortDropdown).selectOption(option);
  }

  // Lấy danh sách tên sản phẩm
  async getItemNames() {
    return await this.page.locator(this.itemNames).allTextContents();
  }

  // Logout
  async logout() {
    await this.page.locator(this.menuBtn).click();
    await this.page.locator(this.logoutLink).click();
  }
}