import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class CartPage extends BaseShopPage{
    readonly proceedToCheckoutButton: Locator;
    readonly cartRows: Locator;
    readonly deleteProductButton: Locator;
    readonly cartEmptyMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutButton = page.locator('a.btn-default.check_out');
        this.cartRows = page.locator('#cart_info_table tbody tr');
        this.deleteProductButton = page.locator('.cart_quantity_delete');
        this.cartEmptyMessage = page.locator('#empty_cart');
    }

    async assertOnCartPage() {
        await expect(this.page).toHaveURL('/view_cart');
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
    
    async assertCartRowCount(expectedRowCount: number) {
        await expect.poll(async () => {
            return await this.cartRows.count();
        }, {
            message: `Polling for cart rows to equal ${expectedRowCount}`,
            timeout: 5000,
        }).toBe(expectedRowCount);
    }    

    async assertCartRow(index: number, name: string, price: string, quantity: number) {
        const row = this.cartRows.nth(index);

        await expect(row.locator('.cart_description h4 a')).toHaveText(name);
        await expect(row.locator('.cart_price p')).toHaveText(price);
        await expect(row.locator('.cart_quantity button')).toHaveText(String(quantity));
    }

    async removeProductFromCart(rowIndex: number) {
        await this.deleteProductButton.nth(rowIndex).click();
    }

    async assertCartIsEmptyMessageVisible() {
        await expect(this.cartEmptyMessage).toContainText("Cart is empty!");
    }

}
