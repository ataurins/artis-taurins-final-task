import { APIRequestContext, APIResponse } from '@playwright/test';
import { BASE_URL } from './constants';
import { User as ShopUser } from './generateUser';

export interface ProductsResponse {
    responseCode: number;
    products?: any[];
    message?: string;
}

export class ShopApiClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
      this.request = request;
    }

    async deleteAccount(email: string, password: string): Promise<void> {
        const response = await this.request.delete(`${BASE_URL}/deleteAccount`, {
            form: { email, password }
        });

        if (!response.ok()) {
            throw new Error(`API Request failed with status ${response.status()} (${response.statusText()})`);
        }
    }

    async getProducts(): Promise<ProductsResponse> {
        const response = await this.request.get(`${BASE_URL}/productsList`);
        return (await response.json()) as ProductsResponse;
    }

	async searchProducts(keyword: string): Promise<ProductsResponse> {
        const options = keyword === "" ? {} : { form: { search_product: keyword } };

        const response = await this.request.post(`${BASE_URL}/searchProduct`, options);
        return (await response.json()) as ProductsResponse;
    }

	async createAccount(user: ShopUser): Promise<void> {
        const response = await this.request.post(`${BASE_URL}/createAccount`, {
            form: {
                name: user.username,
                email: user.email,
                password: user.password,
                title: 'Mr',
                birth_date: user.birthDay,
                birth_month: user.birthMonth,
                birth_year: user.birthYear,
                firstname: user.firstName,
                lastname: user.lastName,
                company: user.company,
                address1: user.address,
                country: user.country,
                zipcode: user.zipCode,
                state: user.state,
                city: user.city,
                mobile_number: user.mobileNumber
            }
        });

        if (!response.ok()) {
             throw new Error(`Account creation failed with status ${response.status()}`);
        }
    }

	async verifyLogin(email: string, password: string): Promise<boolean> {
        const response = await this.request.post(`${BASE_URL}/verifyLogin`, {
            form: { email, password }
        });
        
        const body = await response.json();
        return body.responseCode === 200;
    }
}
