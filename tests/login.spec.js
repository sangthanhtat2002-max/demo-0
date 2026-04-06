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

    // // ✅ Allow location permission
    // await loginPage.allowLocation();

    // // Click login button
    // await loginPage.clickLoginButton();

    // Verify email and password input
    await expect(page.locator('[id="1-email"]')).toBeVisible();
    await expect(page.locator('[id="1-password"]')).toBeVisible();

    // ✅ Verify login button (Log In)
    await expect(page.locator('[id="1-submit"]')).toBeVisible();
  });

  // TC02: Login thành công
  test('TC02 - Login thành công vào Cosmos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    // Go to URL
    await basePage.goToURL();

    console.log('USER:', process.env.SAUCE_USERNAME);
    console.log('PASS:', process.env.SAUCE_PASSWORD);

    await loginPage.login(
      process.env.SAUCE_USERNAME,
      process.env.SAUCE_PASSWORD
    );

    await expect(page.locator('span').filter({ hasText: 'Overview' })).toBeVisible();
    await page.waitForLoadState('networkidle');      // trang load hoàn toàn
  });
});