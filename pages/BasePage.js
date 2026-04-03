export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goToURL() {
    await this.page.goto('https://dfm.qa.spdigital.sg/login/');
  }

  async getTitle() {
    return await this.page.title();
  }
}