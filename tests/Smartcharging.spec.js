import { test, expect } from '@playwright/test';
import { Smartcharging } from '../pages/Smartcharging';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Smartcharging Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);

        // Go to URL
        await basePage.goToURL();

        // Login thành công
        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );

        await expect(page.locator('span').filter({ hasText: 'Overview' })).toBeVisible();
        await page.waitForLoadState('networkidle');      // trang load hoàn toàn
    });

    test('TC07 - Navigate to Smartcharging view', async ({ page }) => {
        const smartcharging = new Smartcharging(page);

        // Navigate to Smartcharging view
        await smartcharging.navigateToSmartchargingView();

        // Verify Smartcharging view is loaded
        await expect(page).toHaveURL(/.*smartcharging.*/);
        await smartcharging.waitForSmartchargingTable();
    });
});