import { APIRequestContext, expect } from '@playwright/test';

export class BookStoreApi {
  constructor(private request: APIRequestContext) {}

  async loginAndGetUserId(username: string, password: string): Promise<string> {
    const response = await this.request.post('/Account/v1/Login', {
      data: { userName: username, password: password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.userId).toBeTruthy();
    return body.userId;
  }

  async generateToken(username: string, password: string): Promise<string> {
    const response = await this.request.post('/Account/v1/GenerateToken', {
      data: { userName: username, password: password },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    return body.token;
  }

  async addBooksToUser(userId: string, token: string, isbns: string[]) {
    const collection = isbns.map((isbn) => ({ isbn }));
    const response = await this.request.post('/BookStore/v1/Books', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId: userId,
        collectionOfIsbns: collection,
      },
    });
    expect([201, 200]).toContain(response.status());
  }

  async deleteAllBooksFromUser(userId: string, token: string) {
    const response = await this.request.delete(`/BookStore/v1/Books?UserId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status()).toBe(204);
  }
}