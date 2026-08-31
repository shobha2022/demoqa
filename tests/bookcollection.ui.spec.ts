import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookDetailsPage } from '../pages/BookDetailsPage';
import { ProfilePage } from '../pages/ProfilePage';
import users from '../test-data/users.json';

test('add book to user collection', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const bookDetailsPage = new BookDetailsPage(page);
  const profilePage = new ProfilePage(page);

  // 1. Authenticate
  await loginPage.navigate();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL(/\/profile/);

  // 2. Add book by ISBN directly to avoid DOM search unreliability
  await bookDetailsPage.gotoBook('9781449325862');
  await bookDetailsPage.addToCollection();

  // 3. Verify in Profile
  await profilePage.navigate();
  await profilePage.expectBookInCollection('Programming JavaScript Applications');
});

test('handle native alert popup', async ({ page }) => {
  await page.goto('https://demoqa.com/profile');

  // 1. Register event listener BEFORE clicking the button
  page.once('dialog', async (dialog) => {
    // Assert dialog type ('alert', 'confirm', or 'prompt')
    expect(dialog.type()).toBe('alert');
    
    // Assert message content
    expect(dialog.message()).toBe('You clicked a button');
    
    // Accept (Click OK)
    await dialog.accept();
  });

  // 2. Trigger the action that causes the alert
  await page.click('#alertButton');
});

