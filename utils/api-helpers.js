// Reusable API helper functions

/**
 * Generate unique test data to avoid conflicts
 */
function generateTestPost() {
  const timestamp = Date.now();
  return {
    title: `Test Post ${timestamp}`,
    body: `Test content created at ${new Date().toISOString()}`,
    userId: 1
  };
}

/**
 * Validate that response has all expected properties
 */
function expectPropertiesExist(object, properties) {
  properties.forEach(prop => {
    if (!object.hasOwnProperty(prop)) {
      throw new Error(`Missing expected property: ${prop}`);
    }
  });
}

/**
 * API endpoints - centralized for easy updates
 */
const API_ENDPOINTS = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts',
  comments: 'https://jsonplaceholder.typicode.com/comments'
};

module.exports = {
  generateTestPost,
  expectPropertiesExist,
  API_ENDPOINTS
};