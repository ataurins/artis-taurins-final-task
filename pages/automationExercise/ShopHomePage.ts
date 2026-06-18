import { Page, Locator, expect } from '@playwright/test';
import { BaseShopPage } from './BaseShopPage';

export class ShopHomePage extends BaseShopPage {
    readonly signupLoginLink: Locator;
    readonly loggedInUserText: Locator;
    readonly productsLink: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly subscriptionSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginLink = page.locator('a[href="/login"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.loggedInUserText = page.locator('.shop-menu a:has-text("Logged in as")');
        this.emailInput = page.getByPlaceholder('Your email address');
        this.subscribeButton = page.locator('button#subscribe');
        this.subscriptionSuccessMessage = page.locator('text="You have been successfully subscribed!"');
    }

    async goto() {
        await this.page.goto('/');
    }

    async assertOnHomePage() {
        await expect(this.page).toHaveURL('/');
    }

    async clickSignupLogin() {
        await this.signupLoginLink.click();
    }

    async assertLoggedInAs(username: string) {
        await expect(this.loggedInUserText).toBeVisible();
        await expect(this.loggedInUserText).toContainText(`Logged in as ${username}`);
    }

    async clickProducts() {
        await this.productsLink.click();
    }

    async scrollToSubscription() {
        await this.emailInput.scrollIntoViewIfNeeded();
    }

    async fillSubscriptionEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async clickSubscribe() {
        await this.subscribeButton.click();
    }

    async assertSubscriptionSuccessMessageVisible() {
        await expect(this.subscriptionSuccessMessage).toBeVisible();
    }

    async assertSubscriptionInputIsCleared() {
        await expect(this.emailInput).toBeEmpty();
    }
}
