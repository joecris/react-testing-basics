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

Typescript TS check:

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

Adding ES lints:
`eslint-plugin-testing-library`
https://testing-library.com/docs/ecosystem-eslint-plugin-testing-library/
https://github.com/testing-library/eslint-plugin-testing-library

`eslint-plugin-vitest`
https://www.npmjs.com/package/eslint-plugin-vitest

Optional
a short CI script that diffs src/components/_.tsx against src/components/_.test.tsx and fails the build if one's missing.

Layout and Mobile responsiveness
How to do this in practice besides snapshots

## Running tests in CI/CD
