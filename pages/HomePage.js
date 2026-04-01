export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async getTitle() {
    return await this.page.title();
  }
}