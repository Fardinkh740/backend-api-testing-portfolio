const { test, expect } = require('@playwright/test');
const { generateTestPost, API_ENDPOINTS } = require('../../utils/api-helpers');

test('@smoke should create new post', async ({ request }) => {
  const newPost = generateTestPost();

  const response = await request.post(API_ENDPOINTS.posts, {
    data: newPost
  });
  
  expect(response.status()).toBe(201);
  
  const created = await response.json();
  
  expect(created.title).toBe(newPost.title);
  expect(created.body).toBe(newPost.body);
  expect(created.userId).toBe(newPost.userId);
  expect(created).toHaveProperty('id');
  
  console.log('✅ Created post with unique timestamp:', created.title);
});