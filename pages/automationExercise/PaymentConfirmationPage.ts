import { Page, Locator, expect } from '@playwright/test';

export class PaymentConfirmationPage {
    readonly page: Page;
    readonly successHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successHeader = page.locator('h2[data-qa="order-placed"]');
    }

    async assertOnPaymentConfirmationPage() {
        await expect(this.page).toHaveURL(/\/payment_done/);
    }

    async assertOrderPlacedSuccess() {
        await expect(this.successHeader).toBeVisible();
        await expect(this.successHeader).toContainText('Order Placed!');
    }
}
