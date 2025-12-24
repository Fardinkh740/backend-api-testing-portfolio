const { defineConfig } = require('@playwright/test');

// Get environment from ENV variable (default: dev)
const TEST_ENV = process.env.TEST_ENV || 'dev';
const envConfig = require('./config/environments')[TEST_ENV];

console.log(`🎯 Running tests against: ${TEST_ENV.toUpperCase()}`);
console.log(`📍 Base URL: ${envConfig.baseURL}`);

module.exports = defineConfig({
  testDir: './tests',
  
  // Environment-specific timeout
  timeout: envConfig.timeout,
  
  // Environment-specific retries
  retries: envConfig.retries,
  
  // Parallel execution
  workers: envConfig.workers,
  fullyParallel: true,
  
  // CI-specific settings
  forbidOnly: !!process.env.CI,
  
  // Reporters
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
    // Add JSON reporter for metrics
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  use: {
    // Environment-specific base URL
    baseURL: envConfig.baseURL,
    
    // Tracing
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Headers
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'User-Agent': 'Playwright-CI-Automation'
    },
  },
  
  // Projects for different test types
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});