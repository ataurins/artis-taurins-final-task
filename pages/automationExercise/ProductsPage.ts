import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly addToCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLinkInModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItems = page.locator('.single-products');
        this.addToCartButton = page.locator('.product-overlay .add-to-cart');
        this.continueShoppingButton = page.locator('button.close-modal, button:has-text("Continue Shopping")');
        this.viewCartLinkInModal = page.locator('.modal-content a[href="/view_cart"]');
    }

    async addFirstProductToCart() {
        await this.productItems.first().hover();
        await this.addToCartButton.first().click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickViewCartInModal() {
        await this.viewCartLinkInModal.click();
    }
}
