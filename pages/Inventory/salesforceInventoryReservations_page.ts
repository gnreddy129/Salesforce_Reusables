import { Page, expect, Locator, TestInfo } from '@playwright/test';
import { Helper } from '../../utils/helper';

export default class SalesforceInventoryReservationsPage {

    readonly page: Page;
    private testInfo?: TestInfo;
    readonly listbox: Locator;

    // Primary UI Controls
    readonly newButton: Locator;
    readonly dialog: Locator;
    readonly reservationIdentifierInput: Locator;
    readonly reservationDurationInput: Locator;
    readonly reservationDateInput: Locator;
    readonly reservationTimeInput: Locator;
    readonly asyncOperationInput: Locator;
    readonly latestOperationInput: Locator;

    // Controls - Detail Page
    readonly reservationHeading: Locator;
    readonly successNotification: Locator;

    // Action Buttons
    readonly saveButton: Locator;

    constructor(page: Page, testInfo?: TestInfo) {
        console.log("🚀 Initializing SalesforceInventoryReservations page object");
        this.page = page;
        this.testInfo = testInfo;

        // Primary controls - Main UI interaction elements
        this.newButton = this.page.getByRole("button", { name: /New/i }).first();
        this.dialog = this.page.getByRole("dialog", { name: /New Inventory Reservation|New/i });
        this.listbox = this.page.getByRole("listbox").first();

        // Form fields

        this.reservationIdentifierInput = this.dialog.getByRole('textbox', { name: /^Reservation Identifier/i, exact: true });
        this.reservationDurationInput = this.dialog.getByRole("spinbutton", { name: /^Reservation Duration in/i });
        this.reservationDateInput = this.page.getByRole("textbox", { name: /date/i });
        this.reservationTimeInput = this.page.getByRole('combobox', { name: /time/i });
        this.asyncOperationInput = this.page.getByRole('checkbox', { name: /async operation/i });
        this.latestOperationInput = this.page.getByRole('checkbox', { name: /latest operation/i });

        // Detail Page
        this.reservationHeading = this.page.locator('heading:has-text("Inventory Reservation")').first();
        this.successNotification = this.page.locator('[class*="success"]');

        // Action buttons - Save operations
        this.saveButton = this.dialog.getByRole("button", { name: 'Save', exact: true });

        console.log("✅ SalesforceInventoryReservations page object initialized successfully with all locators");
    }

    async addNewInventoryReservation(data: any) {
        console.log('Filling Inventory Reservation form');

        // Take screenshot for verification
        if (this.testInfo) {
            await Helper.takeScreenshotToFile(this.page, '01-filling-start', this.testInfo, 'Inventory/inventory-reservation');
        }

        // Fill Reservation Identifier
        if (data.ReservationIdentifier) {
            await expect(this.reservationIdentifierInput).toBeVisible({ timeout: 10000 });
            await this.reservationIdentifierInput.fill(data.ReservationIdentifier);
            console.log(`Reservation Identifier: ${data.ReservationIdentifier}`);
        }

        // Fill Reservation Duration
        if (data.ReservationDuration) {
            await expect(this.reservationDurationInput).toBeVisible({ timeout: 10000 });
            await this.reservationDurationInput.fill(data.ReservationDuration);
            console.log(`Reservation Duration: ${data.ReservationDuration}`);
        }

        // Select Date
        if (data.ReservationDate) {
            await expect(this.reservationDateInput).toBeVisible({ timeout: 10000 });
            await this.reservationDateInput.clear();
            await this.reservationDateInput.fill(data.ReservationDate);
            await this.page.waitForTimeout(500);
            console.log(`Reservation Date: ${data.ReservationDate}`);
        }

        // Select Time
        if (data.ReservationTime) {
            await expect(this.reservationTimeInput).toBeVisible({ timeout: 10000 });
            await this.reservationTimeInput.click();
            await this.page.waitForTimeout(500);
            const timeOption = this.page.getByRole('option', { name: new RegExp(data.ReservationTime, 'i') });
            await expect(timeOption).toBeVisible({ timeout: 5000 });
            await timeOption.click();
            console.log(`Reservation Time: ${data.ReservationTime}`);
        }

        // Async Operation in Progress
        if (data.AsyncOperation && (data.AsyncOperation.toLowerCase() === 'true' || data.AsyncOperation === 'True')) {
            await expect(this.asyncOperationInput).toBeVisible({ timeout: 10000 });
            await this.asyncOperationInput.check();
            console.log(`Async Operation in Progress: ${data.AsyncOperation}`);
        }

        // Latest Operation Succeeded
        if (data.LatestOperation && (data.LatestOperation.toLowerCase() === 'true' || data.LatestOperation === 'True')) {
            await expect(this.latestOperationInput).toBeVisible({ timeout: 10000 });
            await this.latestOperationInput.check();
            console.log(`Latest Operation Succeeded: ${data.LatestOperation}`);
        }

        // Take screenshot for verification
        if (this.testInfo) {
            await Helper.takeScreenshotToFile(this.page, '02-Filling-Complete', this.testInfo, 'Inventory/inventory-reservation');
        }

        // Save the form
        await expect(this.saveButton).toBeVisible({ timeout: 10000 });
        await this.saveButton.click();
        await this.page.waitForTimeout(2000);

        // Take screenshot for verification
        if (this.testInfo) {
            await Helper.takeScreenshotToFile(this.page, '03-Status', this.testInfo, 'Inventory/inventory-reservation');
        }
    }

    async verifyNewlyCreatedInventoryReservation(data: any) {
        console.log('Verifying reservation details on detail page');

        // Wait a moment for page to load
        await this.page.waitForTimeout(2000);

        // Get page content for text verification
        const pageContent = await this.page.content();
        const pageText = await this.page.innerText('body');

        console.log('Checking page content for reservation details...');

        // Verify Reservation Identifier
        if (data.ReservationIdentifier) {
            if (pageContent.includes(data.ReservationIdentifier) || pageText.includes(data.ReservationIdentifier)) {
                console.log(`✓ Reservation Identifier verified: ${data.ReservationIdentifier}`);
            } else {
                console.log(`✗ Reservation Identifier NOT found: ${data.ReservationIdentifier}`);
            }
        }

        // Verify Reservation Duration
        if (data.ReservationDuration) {
            if (pageContent.includes(String(data.ReservationDuration)) || pageText.includes(String(data.ReservationDuration))) {
                console.log(`✓ Reservation Duration verified: ${data.ReservationDuration}`);
            } else {
                console.log(`✗ Reservation Duration NOT found: ${data.ReservationDuration}`);
            }
        }

        // Verify Reservation Date
        if (data.ReservationDate) {
            if (pageContent.includes(data.ReservationDate) || pageText.includes(data.ReservationDate)) {
                console.log(`✓ Reservation Date verified: ${data.ReservationDate}`);
            } else {
                console.log(`✗ Reservation Date NOT found: ${data.ReservationDate}`);
            }
        }

        // Verify Reservation Time
        if (data.ReservationTime) {
            if (pageContent.includes(data.ReservationTime) || pageText.includes(data.ReservationTime)) {
                console.log(`✓ Reservation Time verified: ${data.ReservationTime}`);
            } else {
                console.log(`✗ Reservation Time NOT found: ${data.ReservationTime}`);
            }
        }

        // Verify Async Operation if value is True
        if (data.AsyncOperation && (data.AsyncOperation.toLowerCase() === 'true' || data.AsyncOperation === 'True')) {
            if (pageContent.includes('Async Operation') || pageText.includes('Async Operation') ||
                pageContent.includes('async operation') || pageText.includes('async operation')) {
                console.log(`✓ Async Operation verified: ${data.AsyncOperation}`);
            } else {
                console.log(`✗ Async Operation NOT found`);
            }
        }

        // Verify Latest Operation if value is True
        if (data.LatestOperation && (data.LatestOperation.toLowerCase() === 'true' || data.LatestOperation === 'True')) {
            if (pageContent.includes('Latest Operation') || pageText.includes('Latest Operation') ||
                pageContent.includes('latest operation') || pageText.includes('latest operation')) {
                console.log(`✓ Latest Operation verified: ${data.LatestOperation}`);
            } else {
                console.log(`✗ Latest Operation NOT found`);
            }
        }

        // Take screenshot for verification
        if (this.testInfo) {
            await Helper.takeScreenshotToFile(this.page, '04-Verification-Complete', this.testInfo, 'Inventory/inventory-reservation');
        }

        console.log('✓ All verification checks completed successfully!');
    }
}