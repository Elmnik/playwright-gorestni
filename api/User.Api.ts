import { APIRequestContext, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class UserApi {
    private request: APIRequestContext;
    private baseUrl: string = process.env.GOREST_API_URL as string;
    private headers = {
        Authorization: `Bearer ${process.env.GOREST_API_TOKEN}`,
        'Content-Type': 'application/json'
    };

    constructor(request: APIRequestContext) {
        if (!request) {
            throw new Error("APIRequestContext is undefined!"); // Debugging error
        }
        this.request = request;
    }

    async createUser(name: string, gender: string, email: string, status: string) {
        console.log("Making API call..."); // Debug log
        const response = await this.request.post('https://gorest.co.in/public/v2/users', {
            headers: {
                Authorization: `Bearer ${process.env.GOREST_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: { name, gender, email, status }
        });
        return response.json();
    }

    async getUser(userId: number) {
        const response = await this.request.get(`${this.baseUrl}/users/${userId}`, { headers: this.headers });
        expect(response.status()).toBe(200);
        return response.json();
    }

    async updateUser(userId: number, status: string) {
        const response = await this.request.put(`${this.baseUrl}/users/${userId}`, {
            headers: this.headers,
            data: { status }
        });
        expect(response.status()).toBe(200);
        return response.json();
    }

    async deleteUser(userId: number) {
        const response = await this.request.delete(`${this.baseUrl}/users/${userId}`, { headers: this.headers });
        expect(response.status()).toBe(204);
    }
}