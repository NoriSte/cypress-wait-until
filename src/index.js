'use strict'

export function waitUntil(arg1, options) {
  if (!(arg1 instanceof Function)) {
    return cy.wait(arg1, options)
  }

  options = {
    ...options,
    // retry: true,
    // verify: true
  }

  console.log('PP')
  cy.log('PP')
  const getValue = () => {
    cy.log('calling')
    console.log('calling')
    return arg1()
      .then(bool => {
        console.log('called')
        cy.log('val', bool)
        cy.log(bool)
      })
  }
  const resolveValue = () => {
    return Cypress.Promise.try(getValue).then(value => {
      cy.log('OO', value)
      return cy.verifyUpcomingAssertions(value, options, {
        onRetry: resolveValue,
      })
    })
  }

  return resolveValue()
}

Cypress.Commands.add("waitUntil", waitUntil);
