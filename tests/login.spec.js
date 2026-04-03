import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';

test.describe('Login Page', () => {
  // TC01: Verify UI elements on login page
  test('TC01 - Verify UI elements on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    // Go to URL
    await basePage.goToURL();

    // ✅ Allow location permission
    await loginPage.allowLocation();

    // Click login button
    await loginPage.clickLoginButton();

    // Verify email and password input
    await expect(page.locator('[id="1-email"]')).toBeVisible();
    await expect(page.locator('[id="1-password"]')).toBeVisible();

    // ✅ Verify login button (Log In)
    await expect(page.locator('[id="1-submit"]')).toBeVisible();
  });

  // TC02: Login thành công
  test('TC02 - Login thành công vào SauceDemo', async ({ page }) => {
    console.log('USER:', process.env.SAUCE_USERNAME);
    console.log('PASS:', process.env.SAUCE_PASSWORD);

    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.login(
      process.env.SAUCE_USERNAME,
      process.env.SAUCE_PASSWORD
    );

    // ✅ Verify redirect tới inventory page
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // TC03: Login thất bại - username sai
  test('TC03 - Login thất bại - username sai', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait('invalid_user', process.env.SAUCE_PASSWORD);

    // ✅ Verify error message hiển thị
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC04: Login thất bại - password sai
  test('TC04 - Login thất bại - password sai', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait(process.env.SAUCE_USERNAME, 'wrong_password');

    // ✅ Verify error message hiển thị
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC05: Login thất bại - để trống username
  test('TC05 - Login thất bại - để trống username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait('', process.env.SAUCE_PASSWORD);

    // ✅ Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
  });

  // TC06: Login với tài khoản bị khóa - locked_out_user
  test('TC06 - Login thất bại - tài khoản bị khóa', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait('locked_out_user', process.env.SAUCE_PASSWORD);

    // ✅ Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});