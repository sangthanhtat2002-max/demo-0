import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { ChargingStationPage } from '../pages/chargingstationpage';

test.describe('Charging Station Page - Post Login Verification', () => {
    // TC05: Verify all section titles are displayed correctly after login
    test('TC05 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const chargingStationPage = new ChargingStationPage(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Open Charging Station dropdown
        await chargingStationPage.navigateToChargingStationView();

        await expect(page).toHaveURL(/.*chargepoints.*/);

        await expect(chargingStationPage.tableContainer.first()).toBeVisible();

        await expect(chargingStationPage.tableContainer).toHaveCount(20);
    });
})