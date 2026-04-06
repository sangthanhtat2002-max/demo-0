export class OverviewPage {
    constructor(page) {
        this.page = page;
        this.chargingStationsSectionTitle = this.page.locator('span').filter({ hasText: 'Charging Stations' });
        this.smartChargingSectionTitle = this.page.locator('a[href="/smartcharging"]');
        this.transactionsSectionTitle = this.page.locator('span').filter({ hasText: 'Transactions' });
        this.maintenanceSectionTitle = this.page.locator('span').filter({ hasText: 'Maintenance' });
        this.accountSectionTitle = this.page.locator('a[href="/account"]');
        this.eventsSectionTitle = this.page.locator('a[href="/events"]');

        this.chargingStationsTableRows = this.page.locator('[data-testid="chargepoint-row"]');
    }

    async getChargingStationsSectionTitle() {
        return await this.chargingStationsSectionTitle.textContent();
    }

    async getSmartChargingSectionTitle() {
        return await this.smartChargingSectionTitle.textContent();
    }

    async getTransactionsSectionTitle() {
        return await this.transactionsSectionTitle.textContent();
    }

    async getMaintenanceSectionTitle() {
        return await this.maintenanceSectionTitle.textContent();
    }

    async getAccountSectionTitle() {
        return await this.accountSectionTitle.textContent();
    }

    async getEventsSectionTitle() {
        return await this.eventsSectionTitle.textContent();
    }

    async waitForChargingStationsTableLoaded() {
        await this.chargingStationsTableRows.first().waitFor({ state: 'visible', timeout: 15000 });
    }
}           