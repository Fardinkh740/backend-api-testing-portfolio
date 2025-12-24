const { test, expect } = require('@playwright/test');

test('@smoke should get user list - critical path', async ({ request }) => {
  const response = await request.get('/users');
  
  expect(response.status()).toBe(200);
  
  const users = await response.json();
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);
  
  console.log(`✅ Smoke: Retrieved ${users.length} users`);
});

test('@regression should get user list with full validation', async ({ request }) => {
  const response = await request.get('/users');
  
  expect(response.status()).toBe(200);
  
  const users = await response.json();
  console.log('First user:', users[0]);
  
  expect(Array.isArray(users)).toBeTruthy();
  expect(users.length).toBeGreaterThan(0);
  expect(users[0]).toHaveProperty('name');
  expect(users[0]).toHaveProperty('email');
});

test('@regression should validate email format in users', async ({ request }) => {
  const response = await request.get('/users');
  const users = await response.json();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  users.forEach(user => {
    expect(emailRegex.test(user.email)).toBeTruthy();
  });
  
  console.log(`✅ Validated ${users.length} email addresses`);
});