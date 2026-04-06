export class LoginPage {
  constructor(page) {
    this.page = page;
    // Tìm locator của nút login / form elements
    //   this.loginButton = this.page.getByRole('button', { name: 'Login' });
    //   this.emailInput = this.page.locator('[id="1-email"]');
    //   this.passwordInput = this.page.locator('[id="1-password"]');
    //   this.submitInput = this.page.locator('[id="1-login"]');
    this.emailInput = this.page.locator('[id="1-email"]');
    this.passwordInput = this.page.locator('[id="1-password"]');
    this.submitInput = this.page.locator('[id="1-submit"]');
    this.overviewSectionTitle = this.page.locator('span').filter({ hasText: 'Overview' });
  }

  // // Click nút Login để dismiss permission prompt
  // async clickLoginButton() {
  //   await this.loginButton.click();
  // }

  // // Cấp quyền truy cập vị trí
  // async allowLocation() {
  //   await this.page.context().grantPermissions(['geolocation']);
  //   await this.page.context().setGeolocation({ latitude: 1.3521, longitude: 103.8198 });
  // }

  // action: input login info and click submit
  async login(username, password) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitInput.click();
    await this.page.waitForLoadState('networkidle');
  }
}