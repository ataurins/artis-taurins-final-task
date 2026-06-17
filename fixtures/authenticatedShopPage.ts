import { test as base, Page } from "@playwright/test";
import { generateUser, User } from "../utils/generateUser";
import { ShopHomePage } from "../pages/automationExercise/ShopHomePage";
import { SignupLoginPage } from "../pages/automationExercise/SignupLoginPage";
import { AccountCreationPage } from "../pages/automationExercise/AccountCreationPage";
import { ShopApiClient } from "../utils/shopApiClient";

export type AuthenticatedShopPageFixture = {
    authenticatedShopPage: Page;
    user: User;
};

export const test = base.extend<AuthenticatedShopPageFixture>({
    user: async ({}, use) => {
        const user = generateUser();
        await use(user);
    },

    authenticatedShopPage: [
        async ({ page, user, request}, use) => {
            const homePage = new ShopHomePage(page);
            const signupLoginPage = new SignupLoginPage(page);
            const accountCreationPage = new AccountCreationPage(page);

            await homePage.goto();
            await homePage.clickSignupLogin();
            await signupLoginPage.assertOnSignupLoginPage();
            await signupLoginPage.signup(user);

            await accountCreationPage.fillAccountCreationForm(user);
            await accountCreationPage.createAccountButton.click();
            await accountCreationPage.assertAccountCreatedTitleIsVisible();
            await accountCreationPage.clickAccountCreatedContinueButton();

            await homePage.assertOnHomePage();
            await homePage.assertLoggedInAs(user.username);

            await use(page);

            const apiClient = new ShopApiClient(request);
            await apiClient.deleteAccount(user.email, user.password);
        },
        { timeout: 60_000 }
    ],
});

export { expect } from "@playwright/test";