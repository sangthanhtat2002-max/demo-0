export class BasePage {
  constructor(page) {
    this.page = page;
    this.url = process.env.BASE_URL;
  }

  async goToURL() {
    await this.page.goto(this.url);
  }

  async getTitle() {
    return await this.page.title();
  }
}