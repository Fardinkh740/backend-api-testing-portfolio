const { test, expect } = require('@playwright/test');

test('should update post', async ({ request }) => {
  const updates = {
    id: 1,
    title: 'Updated Title',
    body: 'Updated Body',
    userId: 1
  };

  const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
    data: updates
  });
  
  expect(response.status()).toBe(200);
  
  const updated = await response.json();
  expect(updated.title).toBe(updates.title);
});

test('should partially update post with PATCH', async ({ request }) => {
  const updates = {
    title: 'Only Title Changed'
  };

  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
    data: updates
  });
  
  expect(response.status()).toBe(200);
  
  const updated = await response.json();
  expect(updated.title).toBe(updates.title);
});