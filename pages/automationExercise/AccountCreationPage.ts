import { Page, Locator, expect } from '@playwright/test';
import { User } from '../../utils/generateUser';
import { BaseShopPage } from './BaseShopPage';

export class AccountCreationPage extends BaseShopPage {
    readonly genderTitle: Locator;
    readonly password: Locator;
    readonly dateOfBirthDay: Locator;
    readonly dateOfBirthMonth: Locator;
    readonly dateOfBirthYear: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccountButton: Locator;
    readonly accountCreatedTitle: Locator;
    readonly accountCreatedContinueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.genderTitle = page.getByRole('radio', { name: 'Mr.' })
        this.password = page.locator('#password');
        this.dateOfBirthDay = page.locator('#days');
        this.dateOfBirthMonth = page.locator('#months');
        this.dateOfBirthYear = page.locator('#years');
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.company = page.locator('#company');
        this.address = page.locator('#address1');
        this.country = page.locator('#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipCode = page.locator('#zipcode');
        this.mobileNumber = page.locator('#mobile_number');
        this.createAccountButton = page.getByRole('button', { name: 'Create Account'});
        this.accountCreatedTitle = page.getByText('Account Created!');
        this.accountCreatedContinueButton = page.getByRole('link', { name: 'Continue' });
    }

    async fillAccountCreationForm(user: User) {
        await this.genderTitle.click();
        await this.password.fill(user.password);
        await this.dateOfBirthDay.selectOption(user.birthDay);
        await this.dateOfBirthMonth.selectOption(user.birthMonth);
        await this.dateOfBirthYear.selectOption(user.birthYear);
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.company.fill(user.company);
        await this.address.fill(user.address);
        await this.country.selectOption(user.country);
        await this.state.fill(user.state);
        await this.city.fill(user.city);
        await this.zipCode.fill(user.zipCode);
        await this.mobileNumber.fill(user.mobileNumber);
    }

    async assertAccountCreatedTitleIsVisible() {
        await expect(this.accountCreatedTitle).toBeVisible();
        await expect(this.page).toHaveURL('/account_created');
    }

    async clickAccountCreatedContinueButton() {
        await this.accountCreatedContinueButton.click();
    }
}