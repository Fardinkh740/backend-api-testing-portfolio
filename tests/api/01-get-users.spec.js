const { test, expect } = require('@playwright/test');

test('should get list of users', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  
  expect(response.status()).toBe(200);
  
  const users = await response.json();
  console.log('First user:', users[0]);
  
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('name');
  expect(users[0]).toHaveProperty('email');
});