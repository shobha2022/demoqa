import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basepage';

export class ProfilePage extends BasePage {
  private readonly usernameValue: Locator;
  private readonly deleteAllBooksButton: Locator;
  private readonly confirmDeleteModalBtn: Locator;
  readonly searchInput: Locator;
  readonly bookRows: Locator;
  readonly logOutButton: Locator;
  readonly deleteSingleBookButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameValue = page.locator('#userName-value');
    this.deleteAllBooksButton = page.getByRole('button', { name: 'Delete All Books' });
    this.deleteSingleBookButtons = page.locator('[id^="delete-record-"]');
    this.confirmDeleteModalBtn = page.locator('#closeSmallModal-ok');
    this.searchInput = page.locator('#searchBox');
    this.bookRows = page.locator('#root table > tbody > tr');
    this.logOutButton = page.getByRole('button', { name: 'Log Out' });
  }

  async navigate() {
    await this.navigateTo('/profile');
  }

  async verifyOnProfilePage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/profile/);
    await expect(this.usernameValue).toBeVisible();
  }

  async waitForLoaded() {
    await expect(this.page).toHaveURL(/\/profile/);
    await expect(this.usernameValue).toBeVisible();
  }

  async getLoggedInUsername(): Promise<string> {
    return this.usernameValue.innerText();
  }

  async isBookInCollection(title: string): Promise<boolean> {
    return this.page.getByRole('link', { name: title }).isVisible();
  }

  async verifyNoBooksInCollection() {
    const emptyMessage = this.page.getByText('No books available in your\'s collection!');
    await expect(emptyMessage).toBeVisible({ timeout: 5000 });
  }
  async deleteAllBooks() {
    // Listen for any dialog that appears
    const dialogs: any[] = [];
    this.page.on('dialog', async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.accept();
    });

    await this.deleteAllBooksButton.click();
    await this.confirmDeleteModalBtn.click();

    // Wait for dialogs to be handled
    await this.page.waitForTimeout(1000);

    console.log('Dialogs received:', dialogs);
  }


  async getBookCount(): Promise<number> {
    return await this.bookRows.count();
  }

  async verifyBookCount(expectedCount: number) {
    await expect(this.bookRows).toHaveCount(expectedCount);
  }


  async deleteSingleBook(index: number) {
    const dialogPromise = this.page.waitForEvent('dialog');

    // await this.deleteSingleBookButtons.nth(index).click();
    await this.deleteSingleBookButtons.first().click();
    await this.confirmDeleteModalBtn.click();

    const dialog = await dialogPromise;
    await dialog.accept();
  }

  async expectBookInCollection(title: string) {
    const bookLocator = this.page.locator(`text=${title}`);
    await expect(bookLocator).toBeVisible();
  }
}
