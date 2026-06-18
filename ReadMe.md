# Playwright/Typescript Automation Exercise Task

A project that showcases End-to-End and API testing for the [Automation Exercise](https://automationexercise.com/) website using Playwright, TypeScript, and the Page Object Model (POM) pattern.

## Table of Contents

* [Setup](#setup)
* [Running Tests](#running-tests)
* [Reports](#reports)
* [Project Structure](#project-structure)
* [CI/CD](#cicd)

---

## Setup

Clone the project, install the dependencies, and initialize the required Playwright browsers (Chromium) by running these commands in your terminal:

```bash
npm install
npx playwright install --with-deps chromium
```

---

## Running Tests

This project uses a targeted configuration for the Automation Exercise suite.

**Run all tests:**

```bash
npm run test
```

**Run a single test:** Open any test file, add `.only` to the test definition, and run that test file:

```typescript
test.only('TC-SHOP-001 — Happy path: full shopping flow', async ({ authenticatedShopPage, user }) => { ... });
```

---

## Reports

This project generates both standard Playwright HTML reports and Allure reports.

**Playwright Report:** To open the default generated HTML report after a test run:

```bash
npx playwright show-report
```

> If any test fails, a screenshot will automatically be attached to it.

**Allure Report:** This project utilizes `@epic`, `@feature`, and `@story` tags to create organized dashboards. To generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
OR
npm run allure:serve
```

---

## Project Structure

The project is built using strict Page Object Model (POM) architecture.

```
.
├── .github/workflows/       # playwright.yml CI/CD pipeline for GitHub Actions
├── fixtures/                # Custom Playwright test fixtures (e.g., authenticatedShopPage)
├── pages/automationExercise/ # POM classes with locators and interaction methods
├── tests/                   # Test specification files (finalTask.spec.ts)
├── utils/                   # Helper utilities, user data generators, and ShopApiClient
└── playwright.config.ts     # Playwright configuration with projects and reporter settings
```

---

## CI/CD

This repository includes a fully configured GitHub Actions workflow. Upon any push or pull request to the `main` branch, the pipeline will automatically:

1. Set up Node.js and install Chromium.
2. Execute the Playwright test suite.
3. Upload raw Allure results and the generated HTML Allure report as downloadable artifacts.

---

### Author

**Artis Tauriņš**