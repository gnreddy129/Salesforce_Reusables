import { Page } from "playwright";
import { TestInfo } from "playwright/test";
import { Helper } from "../utils/helper";

export class BasePage{

    constructor(public readonly page: Page){
    }

    async attachScreenshotToReport(screenshotName : string, testInfo: TestInfo){
        Helper.attachScreenshotToReport(this.page, screenshotName, testInfo);
        return this;
    }
}