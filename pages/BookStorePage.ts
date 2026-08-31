import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './basepage';

export class BookStorePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly bookTitles: Locator;
  private readonly bookDetailTitle: Locator;
  private readonly noDataRow: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder('Type to search');
    this.bookTitles = page.locator('tr td:nth-child(2) a');
    this.bookDetailTitle = page.locator('#title-wrapper');
    this.noDataRow = page.locator('.rt-noData');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/books');
  }

  async getAllBookTitles(): Promise<string[]> {
    const titles = await this.bookTitles.allTextContents();
    return titles.map(title => title.trim());
  }

  async verifyBookCount(expectedCount: number) {
    await expect(this.bookTitles).toHaveCount(expectedCount);
  }

  async navigate() {
    await this.navigateTo('/books');
  }

  async searchBook(title: string) {
    await this.searchInput.fill(title);
  }

  async getVisibleBookTitles(): Promise<string[]> {
    const titleCells = this.page.locator('.rt-tr-group .rt-td:nth-child(2) a');
    return titleCells.allInnerTexts();
  }

  async selectBookByTitle(title: string) {
    await this.page.getByRole('link', { name: title }).click();
  }

  async verifyBookDetailPage(title: string) {
    await expect(this.page).toHaveURL(/.*books\?search=/);
    await expect(this.bookDetailTitle).toContainText(title);
  }
  
  async getNoDataText(): Promise<string> {
    return this.noDataRow.innerText();
  }
}