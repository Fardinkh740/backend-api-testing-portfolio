const { test, expect } = require('@playwright/test');

test.describe('@smoke Single User Retrieval', () => {
  
  test('should get single user by ID', async ({ request }) => {
    const response = await request.get('/users/1');
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user.id).toBe(1);
  });
});

test.describe('@regression Error Handling', () => {
  
  test('should return 404 for non-existent user', async ({ request }) => {
    const response = await request.get('/users/999999');
    expect(response.status()).toBe(404);
  });
});