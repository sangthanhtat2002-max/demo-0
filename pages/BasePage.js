export class BasePage {
  constructor() {
    this.url = process.env.BASE_URL;
  }

  async goToURL() {
    await this.page.goto(this.url);
  }

  async getTitle() {
    return await this.page.title();
  }
}