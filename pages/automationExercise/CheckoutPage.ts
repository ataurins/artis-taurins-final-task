import { Page, Locator, expect } from '@playwright/test';
import { User } from '../../utils/generateUser';
import { BaseShopPage } from './BaseShopPage';

export class CheckoutPage extends BaseShopPage{
    readonly deliveryAddress: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddress = page.locator('#address_delivery');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async assertOnCheckoutPage() {
        await expect(this.page).toHaveURL('/checkout');
    }

    async assertDeliveryAddress(user: User) {
        const expectedFullName = `Mr. ${user.firstName} ${user.lastName}`;  
        await expect(this.deliveryAddress).toContainText(expectedFullName);
        await expect(this.deliveryAddress).toContainText(user.company);
        await expect(this.deliveryAddress).toContainText(user.address);
        await expect(this.deliveryAddress).toContainText(`${user.city} ${user.state} ${user.zipCode}`);
        await expect(this.deliveryAddress).toContainText(user.country);
        await expect(this.deliveryAddress).toContainText(user.mobileNumber);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
}
