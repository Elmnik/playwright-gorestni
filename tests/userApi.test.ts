import { test, expect, request } from '@playwright/test';
import { UserApi } from '../api/User.Api';
import { userData } from '../utils/testData';
import { APIRequestContext } from '@playwright/test';

test.describe('GoRest API Tests', () => {
    let userApi: UserApi;
    let userId: number;

    test.beforeAll(async () => {
       const apiRequest = await request.newContext();
        userApi = new UserApi(apiRequest);
    });

    test('Create, Get, Update, and Delete User', async () => {
        // Create user
        const newUser = await userApi.createUser(userData.name, userData.gender, userData.email, userData.status);
        expect(newUser).toHaveProperty('id');
        userId = newUser.id;

        // Get user details
        const fetchedUser = await userApi.getUser(userId);
        expect(fetchedUser).toMatchObject(userData);

        // Update user status
        const updatedUser = await userApi.updateUser(userId, 'inactive');
        expect(updatedUser.status).toBe('inactive');

        // Delete user
        await userApi.deleteUser(userId);
    });
});