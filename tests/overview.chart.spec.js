import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { OverviewChartPage } from '../pages/Overview_chartpage';

test.describe('Overview Chart Page - Post Login Verification', () => {
    // TC03: Verify all section titles are displayed correctly after login
    test('TC03 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const overviewpage = new OverviewChartPage(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Charging Stations
        await expect(overviewpage.chargingStationsSectionTitle).toBeVisible();
        // Smart Charging
        await expect(overviewpage.smartChargingSectionTitle).toBeVisible();

        // Transactions
        await expect(overviewpage.transactionsSectionTitle).toBeVisible();

        // Maintenance
        await expect(overviewpage.maintenanceSectionTitle).toBeVisible();

        // Account
        await expect(overviewpage.accountSectionTitle).toBeVisible();

        // Events
        await expect(overviewpage.eventsSectionTitle).toBeVisible();

        await expect(overviewpage.chargingStationsTableRows.first()).toBeVisible();
        await expect(overviewpage.chargingStationsTableRows).toHaveCount(20);
    });
})