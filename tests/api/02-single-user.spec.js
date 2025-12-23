const { test, expect } = require('@playwright/test');

test('should get single user by ID', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
  
  expect(response.status()).toBe(200);
  
  const user = await response.json();
  
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('address');
  expect(user.id).toBe(1);
});

test('should return 404 for non-existent user', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/999999');
  
  expect(response.status()).toBe(404);
});