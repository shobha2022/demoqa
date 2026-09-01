import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/BookStorePage';

let bookStorePage: BookStorePage;

test.beforeEach(async ({ page }) => {
    bookStorePage = new BookStorePage(page);
    await bookStorePage.navigate();
  });

  //Test to verify the book count and non-empty titles
  test('Test to display the expected number of books and non-empty titles', async () => {
    const EXPECTED_BOOK_COUNT = 8;

    // Encapsulated assertion on element count
    await bookStorePage.verifyBookCount(EXPECTED_BOOK_COUNT);

    // Fetch titles via page object method and verify non-empty strings
    const titles = await bookStorePage.getAllBookTitles();
    titles.forEach((title) => {
      expect(title.length).toBeGreaterThan(0);
    });
  });

  //Test to navigate to book detail page on title click
  test('Test to navigate to book detail page on title click', async () => {
    const bookTitle = 'Git Pocket Guide';

    await bookStorePage.selectBookByTitle(bookTitle);
    await bookStorePage.verifyBookDetailPage(bookTitle);
  });

  //Test to verify existing book search
  test('Test to search for an existing book and verify the result', async () => {
    const bookTitle = 'Git Pocket Guide';
    await bookStorePage.searchBook(bookTitle);
    const visibleTitles = await bookStorePage.getAllBookTitles();
    expect(visibleTitles).toHaveLength(1);
    expect(visibleTitles).toContain(bookTitle);
  }); 

  //Test to verify search for a non-existing book
  test('Test to search for a non-existing book and verify the result', async () => {
    const bookTitle = 'Non-Existing Book';
    await bookStorePage.searchBook(bookTitle);
    const visibleTitles = await bookStorePage.getAllBookTitles();
    expect(visibleTitles).not.toContain(bookTitle);

  });

  //Test to verify selecting a book by title
  test('Test to select a book by title and navigate to its details page', async () => {
    const bookTitle = 'Git Pocket Guide';
    await bookStorePage.selectBookByTitle(bookTitle);
    const visibleTitles = await bookStorePage.getAllBookTitles();
    expect(visibleTitles).toContain(bookTitle);
  });
