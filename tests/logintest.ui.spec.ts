import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import users from '../test-data/users.json';

type UserCredentials = { username: string; password: string };
type UsersFixture = {
  invalidUser: UserCredentials;
  validUser: UserCredentials;
  invalidPassword: UserCredentials;
};

const typedUsers = users as UsersFixture;

test.describe('Login Test Functional Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // Test for valid username with incorrect password
  test('Valid user name Incorrect Password', async ({ page }) => {
    await loginPage.login(typedUsers.invalidPassword.username, typedUsers.invalidPassword.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid username or password!');
  });

  // Test for invalid username with valid password
   test('Invalid username, valid password test', async ({ page }) => {
    await loginPage.login(typedUsers.invalidUser.username, typedUsers.invalidUser.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid username or password!');
  });

  // Test for valid username with correct password
  test('Valid login test', async ({ page }) => {
    await loginPage.login(typedUsers.validUser.username, typedUsers.validUser.password);

    const pageTitle = await page.title();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible({ timeout: 10000 });
    
  });

});