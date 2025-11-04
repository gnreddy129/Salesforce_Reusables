import { test as base } from '@playwright/test';
import { CommonPage } from '../pages/commonPage';

// Declare the types of your fixtures.
type MyFixtures = {
  commonPage: CommonPage;
};

export const test = base.extend<MyFixtures>({
  commonPage: async({page} , use) =>{
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },
});

export { request } from '@playwright/test';

export { expect } from '@playwright/test';