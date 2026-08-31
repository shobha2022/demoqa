import { Page, Locator, expect } from '@playwright/test';

export class BookDetailsPage {
  private readonly addToCollectionButton: Locator;

  constructor(private page: Page) {
    this.addToCollectionButton = page.locator('button:has-text("Add To Your Collection")');
  }

  async gotoBook(isbn: string) {
    await this.page.goto(`https://demoqa.com/books?book=${isbn}`);
  }

  async addToCollection() {
    // Set up dialog handler before triggering the action
    // Set up event listener first
  const dialogPromise = new Promise<import('@playwright/test').Dialog>((resolve) => {
    this.page.once('dialog', resolve);
  });

  this.page.on('dialog', async dialog => {
  console.log(dialog.message()); // Prints the exact popup message
  await dialog.accept();
});
  // Ensure button is scrolled into view past demoqa ads
//await this.addToCollectionButton.scrollIntoViewIfNeeded;
  await this.addToCollectionButton.click();

  // Await the dialog promise after click
  const dialog = await dialogPromise;
  expect(dialog.message()).toContain('Book added to your collection.');
  await dialog.accept();
  }
}