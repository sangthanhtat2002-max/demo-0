export class OverviewMapPage {
    constructor(page) {
        this.page = page;

        // Dropdown trigger (nút Overview hoặc dropdown chứa Map)
        this.overviewDropdown = this.page.locator('span').filter({ hasText: 'Overview' });

        // Menu item "Map"
        this.mapMenuItem = this.page.locator('a[href="/map"]');

        // Map container
        this.mapContainer = this.page.locator('gmp-advanced-marker').first();
    }

    async navigateToMapView() {
        await this.overviewDropdown.hover();
        await this.overviewDropdown.waitFor({ state: 'visible' });
        await this.mapMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async waitForMapcontainer() {
        await this.mapContainer.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }
}