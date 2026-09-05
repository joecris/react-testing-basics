# React Testing Basics

This application is used to demostrate basic testing of React applications including:

- Unit tests
- E2E tests
- A11Y tests
- Other tests

See [A11Y_BASICS.md](A11Y_BASICS.md) for more details on web development accessibility guide

## Frameworks and libraries

### Vitest

Used as the test runner and assertion library https://vitest.dev/guide/

```
npm install -D vitest
```

```
// package.json
{
  ...
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest", // running the test suite
    "test:coverage": "vitest run --coverage", // coverage test
    "test:typecheck": "tsc -b --noEmit" // TypeScript test
  },
  ....
}
```

```
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      thresholds: { // enforce tresholds
        perFile: true, // good floor to enforce on every file
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    globals: true,
  },
});
```

Note: `globals: true` enables to not define things like `describe` `test` `expect` etc on every test file. But additionally we would need to add `"types": ["vite/client", "vitest/globals"],` to `tsconfig.app.json` so the IDE would not show any errors.

Vitest UI is useful for debugging tests or if you want a more visually rich overview of your tests

```
vitest --ui // needs "@vitest/ui" lib
```

### React Testing Library

The `@testing-library` family of packages helps you test UI components in a user-centric way.

Here is a quicck guide of (How to avoid testing implementation details and write better tests)[https://kentcdodds.com/blog/testing-implementation-details]

The basic guiding principle is (tests should resemble the way your software is used so they give you confidence)[https://testing-library.com/docs/guiding-principles/]

Installing React Testing Library https://testing-library.com/docs/react-testing-library/intro

```
npm install --save-dev @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom

OR if you don't have the React types installed yet (usually already installed when using Vite)

npm install --save-dev @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom @types/react @types/react-dom
```

Create a "test file setup" and use jsdom as test environment

```
// src/test-setup.ts
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

// vitest.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    ...
  }
})
```

Also see https://testing-library.com/docs/dom-testing-library/setup which mentions setup using Vitest

## Unit and Component Testing

These are written to test functionality of things like functions, React components in isolation and ensure they behave as expected.

Refer to https://vitest.dev/guide/learn/writing-tests.html on how to write effective unit tests using Vitest.

Vitest test matchers are very similar to Jest https://vitest.dev/guide/learn/matchers.html

Testing Async code https://vitest.dev/guide/learn/async.html

By default, each test has a `5-second timeout`. If a test takes longer than that (perhaps because a promise never resolves, or a network request hangs), it will fail with a timeout error. This prevents your test suite from getting stuck indefinitely. This can be overridden, for example in the vitest config

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 10_000,
  },
})
```

Similarly, Vitest enables way to do some setup and teardown/cleanup on certain points/lifecycle in the tests ex. before each, after each, before all, after all, etc. This helps us ind doing things like setting up data, cleaning up data and mocks, etc.

See https://vitest.dev/guide/learn/setup-teardown.html

Sometimes, we would need to mock another function or module used by the thing we want to test, we can do so via Vitest mocks https://vitest.dev/guide/learn/mock-functions.html

Note: for mocking HTTP requests consider using (Mock Service Worker)[https://mswjs.io/]

Here are some additional recommendations for writing what to test https://vitest.dev/guide/learn/testing-in-practice.html

### Testing user events

https://testing-library.com/docs/user-event/intro/

Example

```
import userEvent from '@testing-library/user-event'

// inlining
test('trigger some awesome feature when clicking the button', async () => {
  const user = userEvent.setup()
  // Import `render` and `screen` from the framework library of your choice.
  // See https://testing-library.com/docs/dom-testing-library/install#wrappers
  render(<MyComponent />)

  await user.click(screen.getByRole('button', {name: /click me!/i}))

  // ...assertions...
})
```

## E2E Testing

## A11Y Testing

## Other Tests

### Linting

Adding ES lints:
`eslint-plugin-testing-library`
https://testing-library.com/docs/ecosystem-eslint-plugin-testing-library/
https://github.com/testing-library/eslint-plugin-testing-library

`eslint-plugin-vitest`
https://www.npmjs.com/package/eslint-plugin-vitest

Optional
a short CI script that diffs src/components/_.tsx against src/components/_.test.tsx and fails the build if one's missing.

### Typescript TS check:

```
{
  ...
  "scripts": {
    ...
    "test:typecheck": "tsc -b --noEmit" // build mode
    ...
  },
  ...
}
```

## Running tests in CI/CD

A GitHub Actions workflow at [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push/PR to `main`. Each concern is its own job so a failure shows up clearly per-check in the PR status, instead of one big pass/fail.

```
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

`concurrency` cancels a stale run if you push again before the previous run finishes, so CI minutes aren't wasted checking commits you've already superseded.

### Lint (runs first)

```
lint:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npm run lint
```

Every other job declares `needs: lint`, so nothing else starts until lint passes. It's the cheapest, fastest check to run, so it acts as a fail-fast gate — a lint error blocks the run before CI spends time on typecheck, coverage, or the slower placeholder jobs.

### Typecheck

```
typecheck:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npm run test:typecheck
```

Runs `tsc -b --noEmit` (see [Other Tests](#other-tests) above for why `-b` is required here) — catches type errors across the whole project reference graph without producing build output.

### Unit tests with coverage

```
unit-tests:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npm run test:coverage
```

Runs `vitest run --coverage`. No extra CI-side threshold logic is needed — `vitest.config.ts` already defines `coverage.thresholds` (with `perFile: true`), so Vitest itself exits non-zero, and fails this job, the moment any file's coverage drops below the configured floor.

### E2E, Accessibility, and Dependency scanning (placeholders)

These three jobs are scaffolded but intentionally not implemented yet — each just echoes a `TODO` so the workflow shape (and the PR status checks) exist ahead of time. Swap the placeholder step for the real tooling when ready:

```
e2e:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: echo "No E2E runner configured yet (e.g. Playwright/Cypress)."

a11y:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: echo "No automated a11y runner configured yet (e.g. jest-axe or Pa11y)."

dependency-scan:
  needs: lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: echo "Snyk not configured yet."
    # Once ready:
    # - uses: snyk/actions/node@master
    #   env:
    #     SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

Dependency scanning needs a `SNYK_TOKEN` added as a repo secret (Settings → Secrets and variables → Actions) before uncommenting the real step.

Layout and Mobile responsiveness
How to do this in practice besides snapshots
