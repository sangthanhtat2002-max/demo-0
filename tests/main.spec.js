import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Mainpage } from '../pages/Mainpage';

test.describe('Main Page - Post Login Verification', () => {
    // TC03: Verify all section titles are displayed correctly after login
    test('TC03 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const mainpage = new Mainpage(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.loginWithoutWait(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Charging Stations
        const chargingStationsTitle = await mainpage.getChargingStationsSectionTitle();
        expect(chargingStationsTitle).toBe('Charging Stations');

        // Smart Charging
        const smartChargingTitle = await mainpage.getSmartChargingSectionTitle();
        expect(smartChargingTitle).toContain('Smart Charging');

        // Transactions
        const transactionsTitle = await mainpage.getTransactionsSectionTitle();
        expect(transactionsTitle).toBe('Transactions');

        // Maintenance
        const maintenanceTitle = await mainpage.getMaintenanceSectionTitle();
        expect(maintenanceTitle).toBe('Maintenance');

        // Account
        const accountTitle = await mainpage.getAccountSectionTitle();
        expect(accountTitle).toContain('Account');

        // Events
        const eventsTitle = await mainpage.getEventsSectionTitle();
        expect(eventsTitle).toContain('Events');
    });
});