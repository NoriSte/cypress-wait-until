/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable {
    waitUntil<Subject = any>(
      checkFunction: () => Subject | Chainable<Subject> | Promise<Subject>,
      options?: { timeout?: number; interval?: number; errorMsg?: string }
    ): Chainable<Subject>;
  }
}
