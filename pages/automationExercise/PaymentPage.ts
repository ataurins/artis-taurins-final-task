import { Page, Locator, expect } from '@playwright/test';
import { CARD_DETAILS } from '../../utils/constants';
import { BaseShopPage } from './BaseShopPage';

export class PaymentPage extends BaseShopPage {
    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expirationMonth: Locator;
    readonly expirationYear: Locator;
    readonly payAndConfirmButton: Locator;


    constructor(page: Page) {
        super(page);
        this.nameOnCard = page.locator('input[data-qa="name-on-card"]');
        this.cardNumber = page.locator('input[data-qa="card-number"]');
        this.cvc = page.locator('input[data-qa="cvc"]');
        this.expirationMonth = page.locator('input[data-qa="expiry-month"]');
        this.expirationYear = page.locator('input[data-qa="expiry-year"]');
        this.payAndConfirmButton = page.locator('button[data-qa="pay-button"]');;
    }

    async assertOnPaymentPage() {
        await expect(this.page).toHaveURL('/payment');
    }

    async fillPaymentDetails(details: typeof CARD_DETAILS = CARD_DETAILS) {
        await this.nameOnCard.fill(details.nameOnCard);
        await this.cardNumber.fill(details.cardNumber);
        await this.cvc.fill(details.cvc);
        await this.expirationMonth.fill(details.expirationMonth);
        await this.expirationYear.fill(details.expirationYear);
    }

    async clickPayAndConfirmOrder() {
        await this.payAndConfirmButton.click();
    }
}
