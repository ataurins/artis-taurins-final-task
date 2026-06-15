import { APIRequestContext } from '@playwright/test';
import { BASE_URL } from './constants';

export class ShopApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Deletes a user account using the Automation Exercise API.
   * Sends a DELETE request with form data containing email and password.
   */
  async deleteAccount(email: string, password: string): Promise<void> {
    const response = await this.request.delete(`${BASE_URL}/deleteAccount`, {
      form: {
        email,
        password
      }
    });

    if (!response.ok()) {
      throw new Error(`API Request failed with status ${response.status()} (${response.statusText()})`);
    }
  }
}
