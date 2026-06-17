import { Page } from '@playwright/test';

export class BaseShopPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}