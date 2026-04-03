export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goTo() {
    const url = process.env.BASE_URL || 'https://www.saucedemo.com/';
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.getByPlaceholder('Username').fill(username);  // ← LOCATOR
    await this.page.getByPlaceholder('Password').fill(password);  // ← LOCATOR
    await this.page.getByRole('button', { name: 'Login' }).click(); // ← LOCATOR
    await this.page.waitForURL(/inventory/, { timeout: 10000 });
  }

  async loginWithoutWait(username, password) {
    await this.page.getByPlaceholder('Username').fill(username);  // ← LOCATOR
    await this.page.getByPlaceholder('Password').fill(password);  // ← LOCATOR
    await this.page.getByRole('button', { name: 'Login' }).click(); // ← LOCATOR
  }
}