import { Page, Locator, expect } from '@playwright/test';

export class ShopHomePage {
    readonly page: Page;
    readonly consentButton: Locator;
    readonly signupLoginLink: Locator;
    readonly loggedInUserText: Locator;
    readonly productsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consentButton = page.getByRole('button', { name: 'Consent' });
        this.signupLoginLink = page.locator('a[href="/login"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.loggedInUserText = page.locator('.shop-menu a:has-text("Logged in as")');
    }

    async goto() {
        await this.page.goto('/');
        await this.dismissConsentBanner();
    }

    async dismissConsentBanner() {
        try {
            await this.consentButton.waitFor({ state: 'visible', timeout: 3000 });
            await this.consentButton.click();
        } catch (e) {}
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

}
