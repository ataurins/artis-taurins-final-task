import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class ProductDetailsPage extends BaseShopPage {
    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator('.product-information h2');
        this.category = page.locator('.product-information p:has-text("Category")');
        this.price = page.locator('.product-information span span');
        this.availability = page.locator('.product-information p:has-text("Availability:")');
        this.condition = page.locator('.product-information p:has-text("Condition:")');
        this.brand = page.locator('.product-information p:has-text("Brand:")');
        this.addToCartButton = page.locator('button.cart');
    }

    async assertOnProductDetailsPage() {
        await expect(this.page).toHaveURL(/\/product_details\/\d+/);
    }

    async assertProductNameVisibleAndNotEmpty() {
        await expect(this.productName).toBeVisible();
        await expect(this.productName).not.toBeEmpty();
    }

    async assertProductMetadataPresentAndNotEmpty() {   
        await expect(this.category).toBeVisible();
        await expect(this.category).not.toBeEmpty();
        
        await expect(this.price).toBeVisible();
        await expect(this.price).not.toBeEmpty();

        await expect(this.availability).toBeVisible();
        await expect(this.availability).not.toBeEmpty();

        await expect(this.condition).toBeVisible();
        await expect(this.condition).not.toBeEmpty();

        await expect(this.brand).toBeVisible();
        await expect(this.brand).not.toBeEmpty();
    }

    async assertAddToCartButtonVisible() {
        await expect(this.addToCartButton).toBeVisible();
    }
}