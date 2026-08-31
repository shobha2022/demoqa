import { Page, Locator } from '@playwright/test';
import { BasePage } from './basepage';
import { ProfilePage } from './profilepage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('UserName');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('#name');
  }

  async navigate() {
    await this.navigateTo('/login');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
    return new ProfilePage(this.page);
  }

  async loginAndGoToProfile(user: string, pass: string): Promise<ProfilePage> {
    await this.login(user, pass);
    const profilePage = new ProfilePage(this.page);
    await profilePage.waitForLoaded();
    return profilePage;
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }
}
