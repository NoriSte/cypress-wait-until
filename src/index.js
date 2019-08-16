'use strict'

function waitUntil(checkFunction, options) {
  if (!(checkFunction instanceof Function)) {
    throw new Error('`checkFunction` parameter should be a function. Found: ' + checkFunction)
  }
  options = options || {}

  const TIMEOUT_INTERVAL = options.interval || 200
  const TIMEOUT = options.timeout || 5000
  const ERROR_MSG = options.errorMsg || 'Timed out retrying'
  let retries = Math.floor(TIMEOUT / TIMEOUT_INTERVAL)

  const check = b => {
    if (b) return
    if (retries < 1) {
      throw new Error(ERROR_MSG)
    }
    cy.wait(TIMEOUT_INTERVAL)
    retries--
    return resolveValue()
  }

  const resolveValue = () => {
    const r = checkFunction()

    if (r && r.then) {
      return r.then(check)
    } else {
      return check(r)
    }
  }

  return resolveValue()
}

Cypress.Commands.add("waitUntil", waitUntil);
