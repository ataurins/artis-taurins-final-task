import { test } from '@playwright/test';
import { ShopHomePage } from '../pages/automationExercise/ShopHomePage';
import { SignupLoginPage } from '../pages/automationExercise/SignupLoginPage';
import { AccountCreationPage } from '../pages/automationExercise/AccountCreationPage';
import { generateUser, User } from '../utils/generateUser';
import { ProductsPage } from '../pages/automationExercise/ProductsPage';
import { CartPage } from '../pages/automationExercise/CartPage';
import { CheckoutPage } from '../pages/automationExercise/CheckoutPage';
import { PaymentPage } from '../pages/automationExercise/PaymentPage';
import { PaymentConfirmationPage } from '../pages/automationExercise/PaymentConfirmationPage';
import { ShopApiClient } from '../utils/shopApiClient';

test.describe('Automation Exercise Shop', () => {
    let user: User;

    test.afterEach(async ({ request }) => {
        if (user) {
            const apiClient = new ShopApiClient(request);
            await apiClient.deleteAccount(user.email, user.password);
        }
    });
  
    test('TC-SHOP-001 — Happy path: full shopping flow (register -> browse -> checkout)', async ({ page }) => {
        const homePage = new ShopHomePage(page);
        const signupLoginPage = new SignupLoginPage(page);
        const accountCreationPage = new AccountCreationPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const paymentPage = new PaymentPage(page);
        const paymentConfirmationPage = new PaymentConfirmationPage(page);

        user = generateUser();
        
        await homePage.goto();
        await homePage.clickSignupLogin();
        await signupLoginPage.assertOnSignupLoginPage();
        await signupLoginPage.signup(user);
        console.log(user.username);
        console.log(user.email);
        console.log(user.password);
        await page.waitForTimeout(3000);
        await accountCreationPage.fillAccountCreationForm(user);
        await accountCreationPage.createAccountButton.click();
        await accountCreationPage.assertAccountCreatedTitleIsVisible();
        await accountCreationPage.clickAccountCreatedContinueButton();
        // await page.waitForTimeout(3000);

        await homePage.assertOnHomePage();
        await homePage.assertLoggedInAs(user.username);

        await homePage.clickProducts();

        await productsPage.addFirstProductToCart();

        await productsPage.clickViewCartInModal();

        await cartPage.assertOnCartPage();
        await cartPage.clickProceedToCheckout();

        await checkoutPage.assertOnCheckoutPage();
        await checkoutPage.assertDeliveryAddress(user);
        await checkoutPage.clickPlaceOrder();

        await paymentPage.assertOnPaymentPage();
        await paymentPage.fillPaymentDetails();
        await paymentPage.clickPayAndConfirmOrder();

        await paymentConfirmationPage.assertOnPaymentConfirmationPage();
        await paymentConfirmationPage.assertOrderPlacedSuccess();

    });
});
