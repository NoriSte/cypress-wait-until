'use strict'

function waitUntil(subject, checkFunction, options) {
  if (!(checkFunction instanceof Function)) {
    throw new Error('`checkFunction` parameter should be a function. Found: ' + checkFunction)
  }
  options = options || {}

  const TIMEOUT_INTERVAL = options.interval || 200
  const TIMEOUT = options.timeout || 5000
  const ERROR_MSG = options.errorMsg || 'Timed out retrying'
  let retries = Math.floor(TIMEOUT / TIMEOUT_INTERVAL)

  const check = result => {
    if (result) {
      return result
    }
    if (retries < 1) {
      throw new Error(ERROR_MSG)
    }
    cy.wait(TIMEOUT_INTERVAL).then(() => {
      retries--
      return resolveValue()
    })
  }

  const resolveValue = () => {
    const result = checkFunction(subject)
    const isAPromise = Boolean(result && result.then)

    if (isAPromise) {
      return result.then(check)
    } else {
      return check(result)
    }
  }

  return resolveValue()
}

Cypress.Commands.add("waitUntil", {prevSubject:'optional'}, waitUntil);
