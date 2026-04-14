export class Smartcharging {
    constructor(page) {
        this.page = page;
        this.SmartchargingMenu = this.page.locator("a[href='/smartcharging']")
        this.SmartchargingTable = this.page.locator("div[class='table-container']")
    }

    async navigateToSmartchargingView() {
        await this.SmartchargingMenu.click();
        await this.page.waitForLoadState('networkidle');
    }

    async waitForSmartchargingTable() {
        await this.SmartchargingTable.first().waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }
}