# Backend API Testing Portfolio

**Professional API test automation demonstrating production-ready testing practices with Playwright**

[![API Tests](https://github.com/Fardinkh740/backend-api-testing-portfolio/actions/workflows/tests.yml/badge.svg)](https://github.com/Fardinkh740/backend-api-testing-portfolio/actions/workflows/tests.yml)

---

## 🎯 Purpose

This repository demonstrates professional backend API testing practices for modern web applications, including:

- RESTful API validation across all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Scalable test architecture with reusable utilities and data factories
- Production-ready CI/CD integration with automated test execution
- Clean, maintainable code following DRY principles and industry best practices

**Target audience:** QA Engineers, Backend Testers, Hiring Managers evaluating automation skills  
**Application domains:** Financial services, E-Government, SaaS platforms, Microservices architectures

---

## 🏗️ Project Structure
```
backend-api-testing-portfolio/
├── .github/
│   └── workflows/
│       └── tests.yml              # CI/CD pipeline configuration
├── tests/
│   └── api/
│       ├── 01-get-users.spec.js   # Read operations & list retrieval
│       ├── 02-single-user.spec.js # Single resource & error handling
│       ├── 03-create-post.spec.js # POST requests with factory data
│       ├── 04-update-post.spec.js # PUT & PATCH operations
│       ├── 05-delete-post.spec.js # DELETE operations
│       └── 06-test-data-factory.spec.js # Dynamic data generation
├── utils/
│   ├── api-helpers.js             # Centralized endpoints & utilities
│   └── test-data.js               # Test data factory pattern
├── playwright.config.js           # Test runner configuration
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Fardinkh740/backend-api-testing-portfolio.git
cd backend-api-testing-portfolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests
```bash
# Run all tests
npx playwright test

# Run specific test suite
npx playwright test tests/api/01-get-users.spec.js

# Run tests with visible browser (headed mode)
npx playwright test --headed

# Generate and view HTML report
npx playwright show-report
```

---

## ✅ Test Coverage

### HTTP Methods Validated
- ✅ **GET** - Single resource retrieval and list operations with pagination
- ✅ **POST** - Resource creation with unique test data
- ✅ **PUT** - Complete resource replacement
- ✅ **PATCH** - Partial resource updates
- ✅ **DELETE** - Resource removal

### Test Scenarios by Category

| Category | Count | Focus Area |
|----------|-------|------------|
| **Happy Path Tests** | 7 | Valid requests with expected 2xx responses |
| **Error Handling** | 2 | 404 validation, non-existent resources |
| **Data Factory Tests** | 2 | Unique test data generation and isolation |
| **Total Coverage** | **11** | **Comprehensive CRUD + validation** |

### Assertion Strategy
Tests validate both HTTP protocol compliance and business-level response integrity:
- Status code verification (2xx success, 4xx client errors)
- Response schema validation (required properties exist)
- Data type checking (strings, numbers, objects)
- Business rule enforcement (IDs match, timestamps present)

---

## 🛠️ Key Technical Features

### 1. Why Playwright for API Testing?

- **Built-in request context** - No external HTTP libraries needed
- **Unified strategy** - Same framework for UI and API tests
- **Modern async model** - Native Promise support, clean syntax
- **First-class reporting** - Rich HTML reports with request/response details

### 2. Scalable Test Architecture

**Centralized configuration:**
```javascript
// utils/api-helpers.js
const API_ENDPOINTS = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts'
};
```

**Reusable test data generation:**
```javascript
// utils/test-data.js
class TestDataFactory {
  static createPost(overrides = {}) {
    const timestamp = Date.now();
    return {
      title: `Post Title ${timestamp}`,
      body: `Content ${timestamp}`,
      userId: 1,
      ...overrides  // Supports custom values
    };
  }
}
```

### 3. Professional vs Naive Implementation

#### ❌ Naive Approach:
```javascript
test('test user creation', async ({ request }) => {
  const response = await request.post('https://example.com/api/posts', {
    data: { title: 'Test', body: 'Test body', userId: 1 }
  });
  expect(response.status()).toBe(201);
});
```

**Issues:**
- Hardcoded URLs (brittle if API changes)
- Static test data (causes conflicts in parallel runs)
- Minimal validation (only status code)

#### ✅ Professional Approach:
```javascript
const { API_ENDPOINTS } = require('../../utils/api-helpers');
const TestDataFactory = require('../../utils/test-data');

test('should create post with unique data and full validation', async ({ request }) => {
  const postData = TestDataFactory.createPost({ userId: 5 });

  const response = await request.post(API_ENDPOINTS.posts, {
    data: postData
  });
  
  expect(response.status()).toBe(201);
  
  const created = await response.json();
  expect(created.title).toBe(postData.title);
  expect(created.userId).toBe(5);
  expect(created).toHaveProperty('id');
  
  console.log('✅ Created:', created.title);
});
```

**Benefits:**
- ✅ Centralized endpoints (update once, change everywhere)
- ✅ Unique test data (prevents flaky tests)
- ✅ Comprehensive validation (schema + business rules)
- ✅ Readable and maintainable

---

## 🔄 CI/CD Integration

### Automated Testing Workflow

Tests run automatically on:
- Every push to `main` or `master` branches
- All pull requests
- Can be triggered manually via GitHub Actions UI

**Pipeline steps:**
1. Checkout code from repository
2. Setup Node.js 20.x environment
3. Install project dependencies (`npm ci`)
4. Install Playwright browsers with system dependencies
5. Execute full test suite (`npx playwright test`)
6. Upload test reports as artifacts (available for 7 days)

**Environment:** Ubuntu Linux (mirrors production deployment targets)

---

## 📊 API Under Test

This project validates [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - a free REST API designed for testing and prototyping.

**Endpoints tested:**
- `/users` - User resource management
- `/posts` - Blog post operations
- `/comments` - Comment handling

**Why this API?**
- Stable and reliable (no rate limiting)
- RESTful design patterns
- Realistic response structures
- Supports all CRUD operations

---

## 💼 Real-World Applications

This test architecture mirrors production implementations at:

- **Financial institutions** - Payment gateway contract testing, transaction validation APIs
- **E-Government systems** - Service integration testing, data exchange validation
- **E-commerce platforms** - Order processing APIs, inventory management
- **SaaS applications** - Multi-tenant API testing, subscription management
- **Microservices architectures** - Service-to-service communication validation

---

## 🎓 Technical Skills Demonstrated

**Core competencies:**
- API Testing (REST, HTTP protocol, status codes, request/response validation)
- Test Automation Frameworks (Playwright for API testing)
- JavaScript/Node.js (Modern ES6+ syntax, async/await, modules)
- CI/CD Pipelines (GitHub Actions, YAML configuration, artifacts)
- Software Engineering Practices (DRY principle, factory patterns, separation of concerns)
- Version Control (Git workflows, meaningful commits, branch management)

**Advanced patterns:**
- Test data isolation and management
- Reusable utility functions
- Scalable folder structure for growing test suites
- Environment-agnostic configuration

---

## 📈 Roadmap & Future Enhancements

**Prioritized by real-world impact:**

- [ ] **Authentication & Authorization** - JWT token handling, OAuth2 flows, role-based access tests
- [ ] **Response Schema Validation** - JSON Schema validation, contract testing
- [ ] **Test Retry Logic** - Smart retries for network instability, flakiness reduction
- [ ] **Parallel Test Execution** - Worker-based parallelization for faster feedback
- [ ] **Test Data Cleanup** - Automated teardown, database state management
- [ ] **Docker Containerization** - Isolated test environment, reproducible builds
- [ ] **Performance Testing** - Response time assertions, load testing integration

---

## 👤 Author

**Fardin Khan**  
Senior QA Automation Engineer | Berlin, Germany

**Background:**
- 5+ years in QA automation for regulated industries (E-Government, Financial Services)
- Expertise: Backend testing, Robot Framework, Playwright, Python, CI/CD (Jenkins, GitLab)
- Current focus: API-first test strategies, microservices validation, test architecture design

**Contact:**
- GitHub: [@Fardinkh740](https://github.com/Fardinkh740)
- Email: kfardin740@gmail.com
- Location: Berlin, Germany

---

## 🎯 Who This Repository Is For

- **QA Engineers** transitioning from manual to automated API testing
- **Backend Developers** looking for API validation examples
- **Hiring Managers** evaluating test automation skills for senior positions
- **Teams** seeking a clean baseline for Playwright API testing

---

## 📝 License

MIT License - Free to use for learning, portfolio, and commercial purposes.

---

## 🙏 Acknowledgments

- **Framework:** [Playwright](https://playwright.dev/) by Microsoft
- **Test API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/) by typicode
- **Inspired by:** Real-world test automation at Nortal AG (E-Government projects for BMF, ITZBund, DRV)

---

## ⭐ Support This Project

If this repository helped you learn API testing or build your portfolio, please consider:
- ⭐ **Starring** this repository
- 🍴 **Forking** it for your own learning
- 📢 **Sharing** it with others in the QA community

**Questions or suggestions?** Open an issue or reach out directly!
