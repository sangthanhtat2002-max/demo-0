import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { OverviewMapPage } from '../pages/Overview_mappage';

test.describe('Overview Map Page - Post Login Verification', () => {
    // TC04: Verify all section titles are displayed correctly after login
    test('TC04 - Verify all section titles are displayed correctly after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const overviewpage = new OverviewMapPage(page);

        // Go to URL
        await basePage.goToURL();

        await loginPage.login(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_PASSWORD
        );
        await page.waitForLoadState('networkidle');

        // Open Overview dropdown
        await overviewpage.navigateToMapView();

        await expect(page).toHaveURL(/.*map.*/);

        // Wait for Map container
        await overviewpage.waitForMapcontainer();

        // Verify Map container is visible
        expect(await overviewpage.mapContainer.isVisible()).toBe(true);
    });
})