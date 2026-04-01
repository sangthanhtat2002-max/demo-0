import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Dùng beforeEach để login trước mỗi TC — tránh lặp code
test.describe('Inventory Page', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Login trước khi chạy mỗi test
    await loginPage.goTo();
    await loginPage.login(
      process.env.SAUCE_USERNAME,
      process.env.SAUCE_PASSWORD
    );
  });

  // TC6: Kiểm tra UI
  test('TC6 - Verify UI trang Inventory', async ({ page }) => {
    // Kiểm tra title
    await expect(inventoryPage.getTitle()).toHaveText('Products');

    // Kiểm tra có đúng 6 sản phẩm
    await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
  });

  // TC7: Thêm sản phẩm vào giỏ hàng
  test('TC7 - Thêm sản phẩm vào giỏ hàng', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();

    // Badge giỏ hàng phải hiển thị số 1
    await expect(inventoryPage.getCartBadge()).toBeVisible();
    await expect(inventoryPage.getCartBadge()).toHaveText('1');
  });

  // TC8: Sắp xếp sản phẩm A→Z
  test('TC8 - Sắp xếp sản phẩm A→Z', async ({ page }) => {
    await inventoryPage.sortBy('az');

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort(); // sort lại bằng JS

    // So sánh — nếu đã đúng thứ tự thì 2 mảng phải giống nhau
    expect(names).toEqual(sorted);
  });

  // TC9: Sắp xếp sản phẩm Z→A
  test('TC9 - Sắp xếp sản phẩm Z→A', async ({ page }) => {
    await inventoryPage.sortBy('za');

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort().reverse();

    expect(names).toEqual(sorted);
  });

  // TC10: Logout
  test('TC10 - Logout thành công', async ({ page }) => {
    await inventoryPage.logout();

    // Sau khi logout → phải quay về trang login
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('input#login-button')).toBeVisible();
  });
});