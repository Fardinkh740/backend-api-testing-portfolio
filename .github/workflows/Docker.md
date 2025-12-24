# Docker Setup & Usage

## Overview

Containerized test execution environment ensuring consistent test runs across local development, CI/CD, and production validation.

## Architecture
```
┌─────────────────────────────────────┐
│  Docker Container                   │
│  ┌───────────────────────────────┐ │
│  │ Node.js 20 + Playwright       │ │
│  │ + Test Suite                  │ │
│  └───────────────────────────────┘ │
│                                     │
│  Volume Mounts:                     │
│  - ./test-results  (output)         │
│  - ./playwright-report (reports)    │
└─────────────────────────────────────┘
```

## Quick Start

### Build Image
```bash
docker build -t api-test-platform .
```

### Run Smoke Tests
```bash
docker run -e TEST_ENV=staging api-test-platform npx playwright test --grep "@smoke"
```

### Run All Tests
```bash
docker run api-test-platform
```

## Docker Compose Usage

### Run Development Tests
```bash
docker-compose up test-dev
```

### Run Staging Tests
```bash
docker-compose up test-staging
```

### Run Production Validation
```bash
docker-compose up test-prod
```

### Run Parallel Regression
```bash
docker-compose up regression-shard-1 regression-shard-2
```

### Run All Services
```bash
docker-compose up
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TEST_ENV` | Target environment (dev/staging/prod) | dev |
| `CI` | CI mode flag | false |
| `API_TOKEN` | Authentication token | - |

## CI/CD Integration

### GitHub Actions with Docker
```yaml
- name: Build Docker image
  run: docker build -t test-runner .

- name: Run tests in container
  run: docker run -e TEST_ENV=staging test-runner
```

## Volume Mounts

**Test Results:**
```bash
docker run -v $(pwd)/test-results:/app/test-results api-test-platform
```

**Reports:**
```bash
docker run -v $(pwd)/playwright-report:/app/playwright-report api-test-platform
```

## Benefits

### Consistency
- Same environment everywhere (dev, CI, prod)
- No "works on my machine" issues
- Reproducible test execution

### Isolation
- Clean environment per run
- No dependency conflicts
- Parallel execution without interference

### Portability
- Runs on any Docker-enabled system
- Easy CI/CD integration
- Cloud-ready (AWS ECS, K8s, etc.)

## Troubleshooting

### Image Build Fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild with no cache
docker build --no-cache -t api-test-platform .
```

### Tests Fail in Container But Work Locally
```bash
# Check environment variables
docker run api-test-platform env

# Run with interactive shell
docker run -it api-test-platform /bin/bash
npx playwright test --debug
```

### Permission Issues with Volumes
```bash
# Linux/Mac: Fix permissions
sudo chown -R $USER:$USER test-results playwright-report

# Windows: Run Docker Desktop as administrator
```

## Advanced Usage

### Custom Network
```yaml
# docker-compose.yml
networks:
  test-network:
    driver: bridge

services:
  test-staging:
    networks:
      - test-network
```

### Multi-Stage Build (Production Optimization)
```dockerfile
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npx", "playwright", "test"]
```

## Integration Examples

### Jenkins
```groovy
pipeline {
    agent {
        docker {
            image 'api-test-platform'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
```

### GitLab CI
```yaml
test:
  image: api-test-platform
  script:
    - npx playwright test
  artifacts:
    reports:
      junit: test-results/junit.xml
```

## Performance

**Container Startup:** ~2-3 seconds  
**Test Execution:** Same as local  
**Total Overhead:** Minimal (<5%)

## Security

- Uses official Node.js slim image
- Minimal dependencies installed
- No secrets in Dockerfile
- Environment variables for sensitive data