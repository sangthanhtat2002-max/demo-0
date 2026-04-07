import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { LocationPage } from '../pages/locationpage';

test.describe('Location Page - Post Login Verification', () => {
    // TC06: Verify all section titles are displayed correctly after login
    test('TC06 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const locationPage = new LocationPage(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Open Location dropdown
        await locationPage.navigateToLocationView();

        await expect(page).toHaveURL(/.*locations.*/);

        await expect(locationPage.tableHeader).toBeVisible();
        await expect(locationPage.tableBody.first()).toBeVisible();
        await expect(locationPage.tableBody).toHaveCount(20);
    });
})