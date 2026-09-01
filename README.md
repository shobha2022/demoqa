
# Playwright Tests for Demo QA book store

Automated end-to-end tests for [DemoQA](https://demoqa.com) using [Playwright](https://playwright.dev).

## Prerequisites

- [Node.js](https://nodejs.org) v18+
- npm

## Getting Started

### Install dependencies

```bash
npm install
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/<test-file>.spec.ts
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Reports

### View HTML report after test run

```bash
npx playwright show-report
```
## Project Structure

```
pwdemoqa/
├── tests/              # Test files
├── pages/              # Page Object Models
├── playwright.config.ts
├── package.json
└── README.md
```

## Configuration

Tests are configured in `playwright.config.ts`.  
Base URL and other settings can be updated there.
# demoqa
Playwright Tests for Demo QA book store

# Playwright Tests for Demo QA book store
- Users are in users.json file and books in books.json file if it needs to be modified.

Automated end-to-end tests for [DemoQA](https://demoqa.com) using [Playwright](https://playwright.dev).

## Prerequisites

- [Node.js](https://nodejs.org) v18+
- npm

## Getting Started

### Install dependencies

```bash
npm install
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/<test-file>.spec.ts
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Reports

### View HTML report after test run

```bash
npx playwright show-report
```
## Project Structure

```
pwdemoqa/
├── tests/              # Test files
├── pages/              # Page Object Models
├── playwright.config.ts
├── package.json
└── README.md
```

## Configuration

Tests are configured in `playwright.config.ts`.  
Base URL and other settings can be updated there.
