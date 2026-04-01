import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page', () => {
  // TC1: Verify UI elements on login page
  test('TC1 - Verify UI elements on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();

    // ✅ Verify logo/title
    await expect(page.locator('[class*="logo"]')).toBeVisible();

    // ✅ Verify username input
    await expect(page.locator('input#user-name')).toBeVisible();
    await expect(page.locator('input#user-name')).toHaveAttribute('placeholder', 'Username');

    // ✅ Verify password input
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('input#password')).toHaveAttribute('placeholder', 'Password');

    // ✅ Verify login button
    await expect(page.locator('input#login-button')).toBeVisible();
    await expect(page.locator('input#login-button')).toHaveValue('Login');
  });

  // TC2: Login thành công
  test('TC2 - Login thành công vào SauceDemo', async ({ page }) => {
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

  // TC3: Login thất bại - username sai
  test('TC3 - Login thất bại - username sai', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait('invalid_user', process.env.SAUCE_PASSWORD);

    // ✅ Verify error message hiển thị
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC4: Login thất bại - password sai
  test('TC4 - Login thất bại - password sai', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait(process.env.SAUCE_USERNAME, 'wrong_password');

    // ✅ Verify error message hiển thị
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  // TC5: Login thất bại - để trống username
  test('TC5 - Login thất bại - để trống username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait('', process.env.SAUCE_PASSWORD);

    // ✅ Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
  });

  // TC6: Login với tài khoản bị khóa - locked_out_user
  test('TC6 - Login thất bại - tài khoản bị khóa', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.loginWithoutWait('locked_out_user', process.env.SAUCE_PASSWORD);

    // ✅ Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});