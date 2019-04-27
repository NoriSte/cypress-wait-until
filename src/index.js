'use strict'

const _ = require("lodash")

export function waitUntil(arg1, options) {
  if (!(arg1 instanceof Function)) {
    return cy.wait(arg1, options)
  }

  _.defaults(options, {
    retry: true,
    verify: true
  })

  const getValue = arg1
  const resolveValue = () => {
    return Cypress.Promise.try(getValue).then(value => {
      return cy.verifyUpcomingAssertions(value, options, {
        onRetry: resolveValue,
      })
    })
  }

  return resolveValue()
}

Cypress.Commands.add("waitUntil", route_login_ok);
