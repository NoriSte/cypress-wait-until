'use strict'

export function waitUntil(checkFunction, options) {
  if (!(checkFunction instanceof Function)) {
    return cy.wait(checkFunction, options)
  }

  const resolveValue = () => {
    return checkFunction()
      .then(b => {
          if (!b) {
            cy.wait(200)
            return resolveValue()
          }
      })
  }

  return resolveValue()
}

Cypress.Commands.add("waitUntil", waitUntil);
