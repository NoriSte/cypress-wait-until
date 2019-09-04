/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    waitUntil<Subject>(
      checkFunction: () => Subject | Chainable<Subject> | Promise<Subject>,
      options?: { timeout?: number; interval?: number; errorMsg?: string }
    ): Chainable<Subject>;
  }
}
