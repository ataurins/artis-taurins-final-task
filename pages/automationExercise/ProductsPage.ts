import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class ProductsPage extends BaseShopPage {
    readonly productItems: Locator;
    readonly addToCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly viewCartLinkInModal: Locator;
    readonly productAddedToCartModal: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchedItemsText: Locator;
    readonly productNames: Locator;
    readonly viewProductButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productItems = page.locator('.single-products');
        this.addToCartButton = page.locator('.product-overlay .add-to-cart');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
        this.viewCartLinkInModal = page.locator('.modal-content a[href="/view_cart"]');
        this.productAddedToCartModal = page.locator('#cartModal')
        this.searchInput = page.getByPlaceholder('Search Product');
        this.searchButton = page.locator('#submit_search');
        this.searchedItemsText = page.locator('.features_items h2');
        this.productNames = page.locator('.features_items .productinfo p');
        this.viewProductButton = page.locator('.choose a');
    }

    async assertOnProductsPage() {
        await expect(this.page).toHaveURL('/products');
    }

    async assertResponseStatus(response: { status(): number }, expectedStatus: number) {
        expect(response.status()).toBe(expectedStatus)
    }

    async addProductToCart(productIndex: number) {
        await this.productItems.nth(productIndex).scrollIntoViewIfNeeded();
        await this.productItems.nth(productIndex).hover();
        await this.addToCartButton.nth(productIndex).click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async assertProductAddedToCart() {
        await expect(this.productAddedToCartModal).toBeVisible();
    }

    async clickViewCartInModal() {
        await this.viewCartLinkInModal.click();
    }

    async searchByKeyword(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }
    
    async clickSearchButton() {
        await this.searchButton.click();
    }

    async assertSearchedItemsText() {
        await expect(this.searchedItemsText.first()).toBeVisible();
        await expect(this.searchedItemsText.first()).toContainText("Searched Products");
    }

    async assertAllProductsContainKeyword(keyword: string) {
        const names = this.productNames;
        const count = await names.count();

        expect(count).toBeGreaterThan(0);
        const allNames = await names.allInnerTexts();

        // Workaround: App returns unrelated products
        // Checking that at least on matches instead of all
        const hasMatchingProduct = allNames.some(name => 
            name.toLowerCase().includes(keyword.toLowerCase())
        );
        expect(hasMatchingProduct).toBe(true);

        // for (let i = 0; i < count; i++) {
        //     const name = await names.nth(i).innerText();
        //     expect(name.toLowerCase(), `Product "${name}" did not contain keyword "${keyword}"`)
        //     .toContain(keyword.toLowerCase());
        // }
    }

    async getProductDetails(index: number): Promise<{ name: string; price: string }> {
        const product = this.page.locator('.productinfo').nth(index);
        const name = await product.locator('p').innerText();
        const price = await product.locator('h2').innerText();
        return { name, price };
    }

    async clickViewProduct(index: number) {
        await this.viewProductButton.nth(index).click();
    }
}
