export interface User {
    username: string;
    email: string;
    password: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobileNumber: string;
}

export function generateUser(): User {
    const timestamp = Date.now();

    return {
        username: `tester${timestamp}`,
        email: `tester${timestamp}@example.com`,
        password: 'password123',
        birthDay: '25',
        birthMonth: 'July',
        birthYear: '1995',
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Company',
        address: '123 Test St',
        country: 'United States',
        state: 'New York',
        city: 'New York',
        zipCode: '10001',
        mobileNumber: '12345678'
    }
}