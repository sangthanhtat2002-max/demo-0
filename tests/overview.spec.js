import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { OverviewPage } from '../pages/Overviewpage';

test.describe('Overview Page - Post Login Verification', () => {
    // TC03: Verify all section titles are displayed correctly after login
    test('TC03 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const overviewpage = new OverviewPage(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Charging Stations
        const chargingStationsTitle = await overviewpage.getChargingStationsSectionTitle();
        expect(chargingStationsTitle).toBe('Charging Stations');

        // Smart Charging
        const smartChargingTitle = await overviewpage.getSmartChargingSectionTitle();
        expect(smartChargingTitle).toContain('Smart Charging');

        // Transactions
        const transactionsTitle = await overviewpage.getTransactionsSectionTitle();
        expect(transactionsTitle).toBe('Transactions');

        // Maintenance
        const maintenanceTitle = await overviewpage.getMaintenanceSectionTitle();
        expect(maintenanceTitle).toBe('Maintenance');

        // Account
        const accountTitle = await overviewpage.getAccountSectionTitle();
        expect(accountTitle).toContain('Account');

        // Events
        const eventsTitle = await overviewpage.getEventsSectionTitle();
        expect(eventsTitle).toContain('Events');

        // Wait for Charging Stations table to load
        await overviewpage.waitForChargingStationsTableLoaded();
        expect(await overviewpage.chargingStationsTableRows.count()).toBeGreaterThan(0);

        // Verify row đầu tiên
        const firstRow = overviewpage.chargingStationsTableRows.first();
        await expect(firstRow).toBeVisible();
    });
})