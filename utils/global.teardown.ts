import { test as close, expect } from '@playwright/test';
import { Helper } from './helper';

close('logout', async ({ page }, testInfo) => {
  await page.goto('/v1/index.html');
  await page.getByRole("button",{name: "Open Menu"}).click({ timeout: 10000 });
  await page.getByText("Logout").click({ timeout: 10000 });
  await expect(page.getByText("Login")).toBeVisible();
  await Helper.attachScreenshotToReport(page, "Logout", testInfo);
});