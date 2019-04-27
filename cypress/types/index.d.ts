
declare namespace Cypress {
  interface Chainable<Subject = any> {
    waitUntil(checkFunction: () => boolean|Promise<boolean>, options?: {timeout?: number, interval?: number}): Chainable<undefined>
  }
}
