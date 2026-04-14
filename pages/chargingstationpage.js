export class ChargingStationPage {
    constructor(page) {
        this.page = page;
        // Dropdown trigger (nút Charging Stations hoặc dropdown chứa Charging Stations)
        this.chargingStationDropdown = this.page.locator('span:has-text("Charging Stations")');
        this.dropMenu = this.page.locator('div.lm--navmenu__sub');
        // Menu item "Charging Stations"
        this.chargingStationMenuItem = this.page.locator('a[href="/chargepoints"]');

        this.tableContainer = this.page.locator('div[class="table-container__body-row"]');
    }

    async navigateToChargingStationView() {
        await this.chargingStationDropdown.hover();
        await this.chargingStationDropdown.waitFor({ state: 'visible' });
        await this.chargingStationMenuItem.click();
        await this.page.waitForLoadState('networkidle');
    }

    async waitForTableContainer() {
        await this.tableContainer.first().waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }
}