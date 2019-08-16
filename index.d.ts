/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    waitUntil(
      checkFunction: () => Chainable<boolean | Promise<boolean>>,
      options?: { timeout?: number; interval?: number; errorMsg?: string }
    ): Chainable<undefined>;
  }
}
