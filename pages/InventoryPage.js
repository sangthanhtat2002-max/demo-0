export class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  // Lấy title trang
  getTitle() {
    return this.page.getByRole('heading', { name: 'Products' }); // ← LOCATOR
  }

  // Lấy tất cả sản phẩm
  getInventoryItems() {
    return this.page.locator('.inventory_item'); // ← LOCATOR
    // Giữ CSS selector vì không có role/text phù hợp hơn
  }

  // Thêm sản phẩm đầu tiên vào giỏ
  async addFirstItemToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click(); // ← LOCATOR
  }

  // Lấy badge giỏ hàng
  getCartBadge() {
    return this.page.locator('.shopping_cart_badge'); // ← LOCATOR
  }

  // Sắp xếp sản phẩm
  async sortBy(option) {
    await this.page.getByRole('combobox').selectOption(option); // ← LOCATOR
  }

  // Lấy danh sách tên sản phẩm
  async getItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents(); // ← LOCATOR
  }

  // Logout
  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click(); // ← LOCATOR
    await this.page.getByRole('link', { name: 'Logout' }).click(); // ← LOCATOR
  }
}