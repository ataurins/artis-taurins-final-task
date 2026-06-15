import { test as base, Page } from "@playwright/test";
import { generateUser } from "../utils/generateUser";
import { ShopHomePage } from "../pages/automationExercise/ShopHomePage";
import { SignupLoginPage } from "../pages/automationExercise/SignupLoginPage";
import { AccountCreationPage } from "../pages/automationExercise/AccountCreationPage";

 export type AuthenticatedShopPageFixture = {
    authenticatedShopPage: Page;
 }

export const test = base.extend<AuthenticatedShopPageFixture>({
    authenticatedShopPage: [
        async ({ browser }, use) => {
            const user = generateUser();
            const page = await browser.newPage();
            const signupLoginPage = new SignupLoginPage(page);
            const shopHomePage = new ShopHomePage(page);
            const accountCreationPage = new AccountCreationPage(page);

            await signupLoginPage.goto();
            await signupLoginPage.signup(user);
            await signupLoginPage.assertOnSignupLoginPage();

            // Fill in account creation form
            await accountCreationPage.fillAccountCreationForm(user);
            await page.waitForTimeout(5000);
            await accountCreationPage.createAccountButton.click();

            await page.waitForTimeout(5000);


            // await shopHomePage.assertOnHomePage();

            await use(page); // test body runs here

            await page.close();
        },
        { timeout: 60_000 }
    ],
})

