import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookDetailsPage } from '../pages/BookDetailsPage';
import users from '../test-data/users.json';
import type { Users } from '../types/users';
import isbnData from '../test-data/books.json';

test.describe('Book Collection', () => {
  for (const isbn of isbnData.isbns) {
    test(`add book with ISBN ${isbn} to collection`, async ({ page }) => {
      // Step 1: Navigate to book detail page
      const bookDetailsPage = new BookDetailsPage(page);
      await bookDetailsPage.navigateToBookByIsbn(isbn);

      // Step 2: Login
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(users.validUser.username, users.validUser.password);
     
       await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible({ timeout: 10000 });

      // Step 3: Navigate back to book and add to collection
      await bookDetailsPage.navigateToBookByIsbn(isbn);
      await bookDetailsPage.addBookToCollection();
    });
  }
});

