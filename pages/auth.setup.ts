import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './loginpage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('testuser', 'Password@123');

  // Assert successful navigation to profile page
  await expect(page).toHaveURL('https://demoqa.com/profile');
  await expect(page.locator('#userName-value')).toHaveText('testuser');

  // Save authenticated state (cookies + localStorage) to disk
  await page.context().storageState({ path: authFile });
});