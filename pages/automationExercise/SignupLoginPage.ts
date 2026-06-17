import { Page, Locator, expect } from '@playwright/test';
import { User } from '../../utils/generateUser';
import { BaseShopPage } from './BaseShopPage';

export class SignupLoginPage extends BaseShopPage {
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');
    }

    async goto() {
        await this.page.goto('/login');
    }

    async assertOnSignupLoginPage() {
        await expect(this.page).toHaveURL('/login');
    }    

    async signup(user: User) {
        await this.signupNameInput.fill(user.username);
        await this.signupEmailInput.fill(user.email);
        await this.signupButton.click();
    }

}
