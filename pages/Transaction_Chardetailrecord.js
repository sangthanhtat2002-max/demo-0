export class Transaction_Chardetailrecord {
    constructor(page) {
        this.page = page;
        this.transactionDropdown = this.page.locator('li:has-text("Transactions")');
        this.dropMenu = this.page.locator('div.lm--navmenu__sub');
        this.charDetailRecord = this.page.locator('a[href="/billing"]');
        this.searchCDRForm = this.page.locator('.searchCDRForm');
        this.tableContainer = this.page.locator('.table-container');
    }

    async navigateToCharDetailRecordView() {
        await this.transactionDropdown.hover();
        await this.transactionDropdown.waitFor({ state: 'visible' });
        await this.charDetailRecord.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }

    async verifyCharDetailRecordView() {
        await expect(this.searchCDRForm).toBeVisible();
        await expect(this.tableContainer).toBeVisible();
    }
}