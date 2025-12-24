/**
 * Environment Configuration
 * Supports dev, staging, production environments
 * Configured via TEST_ENV environment variable
 */

module.exports = {
  dev: {
    baseURL: process.env.DEV_API_URL || 'https://jsonplaceholder.typicode.com',
    timeout: 30000,
    retries: 2,
    workers: 4,
    reporter: 'html'
  },
  
  staging: {
    baseURL: process.env.STAGING_API_URL || 'https://jsonplaceholder.typicode.com',
    timeout: 20000,
    retries: 1,
    workers: 4,
    reporter: 'html'
  },
  
  prod: {
    baseURL: process.env.PROD_API_URL || 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    retries: 0,  // No retries in production validation
    workers: 2,  // Reduced load on prod
    reporter: 'junit'
  }
};