export class LoginPage {
  constructor(page) {
    this.page = page;

    // Selector của SauceDemo
    this.usernameInput = 'input#user-name';
    this.passwordInput = 'input#password';
    this.loginBtn = 'input#login-button';
  }

  async goTo() {
    const url = process.env.BASE_URL || 'https://www.saucedemo.com/';
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginBtn, { force: true });
    await this.page.waitForURL(/inventory/, { timeout: 10000 });
  }

  async loginWithoutWait(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginBtn, { force: true });
  }
}
