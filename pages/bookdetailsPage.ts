import { Page, Locator, expect } from '@playwright/test';

export class BookDetailsPage {
  readonly page: Page;
  readonly addToCollectionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCollectionButton = page.getByRole('button', { name: 'Add To Your Collection' });
  }

  async navigateToBookByIsbn(isbn: string) {
    await this.page.goto(`https://demoqa.com/books?search=${isbn}`);
  }

  async addBookToCollection() {
    console.log('Current URL:', this.page.url());
  await expect(this.addToCollectionButton).toBeVisible({ timeout: 5000 });

    // Set up dialog listener and click the add button simultaneously
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.addToCollectionButton.click()
    ]);

  expect(dialog.message()).toMatch(/Book added to your collection|Book already present in the your collection!/);
  await dialog.accept();
  }
}