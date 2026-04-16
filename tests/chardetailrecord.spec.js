import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { Transaction_Chardetailrecord } from '../pages/Transaction_Chardetailrecord';

test.describe('Transaction_Chardetailrecord Page - Post Login Verification', () => {
    // TC07: Verify all section titles are displayed correctly after login
    test('TC07 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const transaction_chardetailrecord = new Transaction_Chardetailrecord(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Open Transaction_Chardetailrecord dropdown
        await transaction_chardetailrecord.navigateToCharDetailRecordView();

        await expect(page).toHaveURL(/.*billing.*/);
        await expect(transaction_chardetailrecord.searchCDRForm).toBeVisible();
        await expect(transaction_chardetailrecord.tableContainer).toBeVisible();
    });
})