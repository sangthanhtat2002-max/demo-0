export class LocationPage {
    constructor(page) {
        this.page = page;
        // Dropdown trigger (nút Charging Stations hoặc dropdown chứa Charging Stations)
        this.chargingStationDropdown = this.page.locator('span:has-text("Charging Stations")');
        this.dropMenu = this.page.locator('div[class="lm--navmenu__sub"]');
        // Menu item "Charging Stations"
        this.locationMenuItem = this.page.locator('a[href="/locations"]');
        // Header của table
        this.tableHeader = this.page.locator('div[class="table-container__header"]');
        // Body của table
        this.tableBody = this.page.locator('div[class="table-container__body-row"]');

    }

    async navigateToLocationView() {
        await this.chargingStationDropdown.hover();
        await this.chargingStationDropdown.waitFor({ state: 'visible' });
        await this.locationMenuItem.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async waitForTableHeader() {
        await this.tableHeader.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    async waitForTableBody() {
        await this.tableBody.first().waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }
}