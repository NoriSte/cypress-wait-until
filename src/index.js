'use strict'

function waitUntil(checkFunction, options) {
  options = options || {}

  const TIMEOUT_INTERVAL = options.interval || 200
  const TIMEOUT = options.timeout || 5000
  let retries = Math.floor(TIMEOUT / TIMEOUT_INTERVAL)

  const resolveValue = () => {
    return checkFunction()
      .then(b => {
          if (b) return
          if (retries < 1) {
            throw new Error('Timed out retrying')
          }
          cy.wait(TIMEOUT_INTERVAL)
          retries--
          return resolveValue()
      })
  }

  return resolveValue()
}

Cypress.Commands.add("waitUntil", waitUntil);
