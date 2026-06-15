import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.locator('a.btn-default.check_out');
    }

    async assertOnCartPage() {
        await expect(this.page).toHaveURL('/view_cart');
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}
