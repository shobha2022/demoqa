import { test, expect } from '@playwright/test';
import { ProfilePage } from '../pages/profilepage';
import { LoginPage } from '../pages/loginpage';
import users from '../test-data/users.json';

test.describe('Profile Page Tests - Unauthenticated', () => {
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);
  });

  test('Test to check redirect or prompt unauthenticated users', async ({ page }) => {
    await profilePage.navigate();
    await expect(page.locator('#notLoggin-wrapper')).toBeVisible();
  });
});

test.describe('Profile Page Tests - Authenticated', () => {
  let currentProfilePage: ProfilePage;

 test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  currentProfilePage = await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );
  await expect(page).toHaveURL(/.*profile/);
});

test('user can log in and view profile', async ({ page }) => {
  await expect(page).toHaveURL(/.*profile/);
});

test('Test to verify display of profile details', async () => {
  const username = await currentProfilePage.getLoggedInUsername();
  expect(username).toBe(users.validUser.username);
});

  test('Test to delete a single book from the profile collection', async () => {
    const initialCount = await currentProfilePage.getBookCount();
  //  expect(initialCount).toBeGreaterThan(0);

    await currentProfilePage.deleteBookAtIndex(0);
    await currentProfilePage.verifyBookCount(initialCount - 1);
  });

  test('Test to delete all books from the profile collection', async () => {
    await currentProfilePage.deleteAllBooks();
    await currentProfilePage.verifyBookCount(0);
  });
});