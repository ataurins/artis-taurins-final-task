import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class PaymentConfirmationPage extends BaseShopPage {
    readonly successHeader: Locator;

    constructor(page: Page) {
        super(page);
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
