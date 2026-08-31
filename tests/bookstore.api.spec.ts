import { test, expect } from '@playwright/test';
import { BookStoreApi } from '../api/BookStoreApi';
import users from '../test-data/users.json';

type UserCredentials = { username: string; password: string };
type UsersFixture = {
	validUser: UserCredentials;
};

const typedUsers = users as UsersFixture;

test.describe('Mini Book Store API Suite', () => {
    test('Login and fetch UserId for valid user through API', async ({  }) => {
	  
	});

    test('Add books to user collection through API', async ({  }) => {
	  
	});

     test('Delete book from collection through API', async ({  }) => {
	  
	});

     test('Delete all books from collection through API', async ({  }) => {
	  
	});

     test('Delete user account through API', async ({  }) => {
	  
	});




	test('Login and fetch UserId for valid userthrough API', async ({ request }) => {
		const api = new BookStoreApi(request);
		const username = typedUsers.validUser.username;
		const password = typedUsers.validUser.password;

		const userId = await api.loginAndGetUserId(username, password);
		const token = await api.generateToken(username, password);

		expect(userId).toBeTruthy();
		expect(token).toBeTruthy();

		await api.deleteAllBooksFromUser(userId, token);
		await api.addBooksToUser(userId, token, ['9781449331818']);

		const booksResponse = await request.get(`/Account/v1/User/${userId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		expect(booksResponse.status()).toBe(200);
		const body = await booksResponse.json();
		expect(body.books).toHaveLength(1);
		expect(body.books[0].isbn).toBe('9781449331818');
	});
});
