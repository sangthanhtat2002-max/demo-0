export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goToURL() {
    await this.page.goto('https://cosmos.qa.energy.spdigital.sg/');
  }

  async getTitle() {
    return await this.page.title();
  }
}