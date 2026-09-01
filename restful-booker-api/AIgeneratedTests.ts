import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

let token: string;
let bookingId: number;

test.describe('Restful Booker API Tests', () => {

  // ── Auth ──────────────────────────────────────────────────────────────
  test('POST /auth - generate token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
    token = body.token;
    console.log('Token:', token);
  });

  // ── GET all bookings ──────────────────────────────────────────────────
  test('GET /booking - get all bookings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    console.log('Total bookings:', body.length);
  });

  // ── POST create booking ───────────────────────────────────────────────
  test('POST /booking - create a new booking', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-01',
          checkout: '2026-09-10'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookingid).toBeTruthy();
    expect(body.booking.firstname).toBe('John');
    expect(body.booking.lastname).toBe('Doe');
    bookingId = body.bookingid;
    console.log('Created Booking ID:', bookingId);
  });

  // ── GET booking by ID ─────────────────────────────────────────────────
  test('GET /booking/:id - get booking by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('John');
    expect(body.lastname).toBe('Doe');
    expect(body.totalprice).toBe(200);
    expect(body.depositpaid).toBe(true);
  });

  // ── PUT update booking ────────────────────────────────────────────────
  test('PUT /booking/:id - update full booking', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 300,
        depositpaid: false,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-10'
        },
        additionalneeds: 'Lunch'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Jane');
    expect(body.lastname).toBe('Smith');
    expect(body.totalprice).toBe(300);
  });

  // ── PATCH partial update ──────────────────────────────────────────────
  test('PATCH /booking/:id - partial update booking', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: 'Updated',
        lastname: 'Name'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Updated');
    expect(body.lastname).toBe('Name');
  });

  // ── DELETE booking ────────────────────────────────────────────────────
  test('DELETE /booking/:id - delete booking', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: { 'Cookie': `token=${token}` }
    });

    expect(response.status()).toBe(201);
  });

  // ── GET deleted booking - verify 404 ─────────────────────────────────
  test('GET /booking/:id - verify booking deleted', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.status()).toBe(404);
  });

});