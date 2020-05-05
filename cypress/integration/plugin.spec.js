/// <reference types="Cypress" />

context('Cypress Wait Until', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/')
  })

  it('Should work with an immediately-satisfied condition', () => {
    const COOKIE_NAME = 'immediate-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then((cookieValue) =>
      expect(cookieValue.value).to.be.equal(EXPECTED_COOKIE_VALUE)
    )
  })

  it('Should work with a condition satisfied after a random delay', () => {
    const COOKIE_NAME = 'after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction).then(() => {
      cy.getCookie(COOKIE_NAME).then((cookieValue) =>
        expect(cookieValue.value).to.be.equal(EXPECTED_COOKIE_VALUE)
      )
    })
  })

  it('Should apply options correctly', () => {
    const COOKIE_NAME = 'after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'

    cy.once('fail', (err) => {
      expect(err.message).to.be.equal('Timed out retrying')
    })

    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction, {
      interval: 100,
      timeout: 900,
    })
  })

  it('Should log a custom logging description', () => {
    const COOKIE_NAME = 'after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'

    cy.once('fail', (err) => {
      expect(err.message).to.be.equal('Timed out retrying')
    })

    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction, {
      interval: 100,
      timeout: 900,
    })
  })

  it('Should check value equality check', () => {
    const COOKIE_NAME = 'change-after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = '7'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then((cookieValue) =>
      expect(cookieValue.value).to.be.equal(EXPECTED_COOKIE_VALUE)
    )
  })

  it('Should make the test fail with an unsatisfied condition', () => {
    const COOKIE_NAME = 'unknwon-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'

    cy.once('fail', (err) => {
      expect(err.message).to.be.equal('Timed out retrying')
    })

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)
  })

  it('Should work sync', () => {
    const checkFunction = () => true

    cy.waitUntil(checkFunction)
  })

  it('Should work sync with retries', () => {
    let n = 4
    const checkFunction = () => {
      n--
      return n < 0
    }

    cy.waitUntil(checkFunction)
  })

  it('`checkFunction` should be a function', () => {
    const ERROR_MESSAGE = '`checkFunction` parameter should be a function. Found: true'

    cy.once('fail', (err) => expect(err.message).to.be.equal(ERROR_MESSAGE))
    cy.waitUntil(true)
  })

  it('Should accept a custom error message', () => {
    const COOKIE_NAME = 'unknwon-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'

    cy.once('fail', (err) => {
      expect(err.message).to.be.equal('Custom error message')
    })

    const checkFunction = () =>
      cy
        .getCookie(COOKIE_NAME)
        .then((cookieValue) => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction, { errorMsg: 'Custom error message' })
  })

  it('Should accept a custom error message that is a function', () => {
    const COOKIE_NAME = 'unknwon-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'
    let dynamicValue = 'before'

    cy.once('fail', (err) => {
      expect(err.message).to.be.equal('Custom error message - after')
    })

    const checkFunction = () =>
      cy.getCookie(COOKIE_NAME).then((cookieValue) => {
        dynamicValue = 'after'
        return cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE
      })

    cy.waitUntil(checkFunction, {
      errorMsg: () => `Custom error message - ${dynamicValue}`,
    })
  })

  it('Should pass the options passed to the plugin to the custom error message function', () => {
    const options = {
      timeout: 100,
      interval: 50,
    }
    const errorMsg = (result, pluginOptions) => {
      expect(result).to.eq(0)
      expect(pluginOptions).to.deep.eq({
        ...options,
        description: 'waitUntil',
        log: true,
        customMessage: [options],
        logger: Cypress.log,
        verbose: false,
        customCheckMessage: undefined,
      })
      return 'Params expectations ok'
    }
    options.errorMsg = errorMsg

    let lastResult = 1
    const checkFunction = () => {
      lastResult = 0
      return lastResult
    }

    cy.once('fail', (err) => {
      expect(err.message).to.be.equal('Params expectations ok')
    })
    cy.waitUntil(checkFunction, options)
  })

  it('Should pass the result to the next command', () => {
    const result = 10

    const checkFunction = () => result
    const asyncCheckFunction = () => Promise.resolve(result)
    const chainableCheckFunction = () => cy.wrap(result).then((wrappedResult) => wrappedResult)

    cy.waitUntil(checkFunction).should('eq', result)
    cy.waitUntil(asyncCheckFunction).should('eq', result)
    cy.waitUntil(chainableCheckFunction).should('eq', result)
  })

  it('Should wait between every check', () => {
    const interval = 100
    let previousTimestamp

    const checkFunction = () => {
      const previousTimestampBackup = previousTimestamp
      const newTimestamp = Date.now()
      previousTimestamp = newTimestamp
      if (previousTimestampBackup) {
        const diff = newTimestamp - previousTimestampBackup
        return diff >= interval
      }
      return false
    }

    const asyncCheckFunction = () => Promise.resolve(checkFunction())
    const chainableCheckFunction = () => cy.wrap().then(() => checkFunction())

    cy.log('Sync function')
    cy.waitUntil(checkFunction, { interval })
    cy.log('Async function')
    cy.waitUntil(asyncCheckFunction, { interval })
    cy.log('Chainable function')
    cy.waitUntil(chainableCheckFunction, { interval })
  })

  it('Should be chainable', () => {
    const result = 10
    const checkFunction = () => result
    const checkFunctionWithSubject = (subject) => subject

    cy.waitUntil(checkFunction).should('eq', result)

    cy.wrap(result).waitUntil(checkFunctionWithSubject).should('eq', result)
  })

  it('Should leverage Cypress.log', () => {
    const checkFunction = () => true

    const logger = {
      log: (...params) => Cypress.log(...params),
    }
    const spy = cy.spy(logger, 'log')

    cy.waitUntil(checkFunction, { logger: logger.log }).then(() => {
      expect(spy).to.have.been.called
      const lastCallArgs = spy.lastCall.args[0]
      expect(lastCallArgs).deep.include({ name: 'waitUntil' })
    })
  })

  it('Should accept a custom log description', () => {
    const checkFunction = () => true
    const description = 'custom description'

    const logger = {
      log: (...params) => Cypress.log(...params),
    }
    const spy = cy.spy(logger, 'log')

    cy.waitUntil(checkFunction, { logger: logger.log, description }).then(() => {
      expect(spy).to.have.been.called
      const lastCallArgs = spy.lastCall.args[0]
      expect(lastCallArgs).deep.include({ name: description })
    })
  })

  it('Should accept a custom message', () => {
    const checkFunction = () => true
    const customMessage = 'custom message'

    const logger = {
      log: (...params) => Cypress.log(...params),
    }
    const spy = cy.spy(logger, 'log')
    const options = { logger: logger.log, customMessage }

    cy.waitUntil(checkFunction, options).then(() => {
      expect(spy).to.have.been.called
      const lastCallArgs = spy.lastCall.args[0]
      expect(lastCallArgs.message).deep.include(customMessage)
    })
  })

  it('Should allow to turn off logging', () => {
    const checkFunction = () => true

    const logger = {
      log: (...params) => Cypress.log(...params),
    }
    const spy = cy.spy(logger, 'log')

    cy.waitUntil(checkFunction, { logger: logger.log, log: false }).then(() => {
      expect(spy).not.to.have.been.called
    })
  })

  it('Should log verbosely every single check', () => {
    let checks = 0
    const checkFunction = () => {
      checks++
      return checks > 1
    }

    const logger = {
      log: (...params) => Cypress.log(...params),
    }
    const spy = cy.spy(logger, 'log')
    const options = { logger: logger.log, verbose: true }

    cy.waitUntil(checkFunction, options).then(() => {
      const calls = spy.getCalls()
      const expected = [
        {
          name: 'waitUntil',
        },
        {
          name: 'waitUntil',
          message: 'false',
        },
        {
          name: 'waitUntil',
          message: 'true',
        },
      ]
      expect(calls).to.have.lengthOf(expected.length)
      for (let n = calls.length, i = 0; i < n; i++) {
        expect(calls[i].args[0]).deep.include(expected[i])
      }
    })
  })

  it('Should accept a `customCheckMessage` option', () => {
    const checkFunction = () => true

    const logger = {
      log: (...params) => Cypress.log(...params),
    }
    const spy = cy.spy(logger, 'log')
    const customCheckMessage = 'custom message check'
    const options = { logger: logger.log, verbose: true, customCheckMessage }

    cy.waitUntil(checkFunction, options).then(() => {
      expect(spy.getCalls()[1].args[0].message.toString()).to.include(customCheckMessage)
    })
  })

  // test useful just to printout all the available options, screenshot them, and add them to the README
  it('Options explanation', () => {
    let checks = 0
    const checkFunction = () => {
      checks++
      return checks > 2
    }
    const checkFunction2 = () => {
      checks++
      return checks > 5
    }

    const options = {
      // log options
      description: 'description',
      customMessage: 'customMessage',
      verbose: true,
      customCheckMessage: 'customCheckMessage',
    }

    cy.waitUntil(checkFunction, { verbose: true })
    cy.waitUntil(checkFunction2, options)
  })
})
