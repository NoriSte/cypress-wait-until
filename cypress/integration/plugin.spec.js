/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/')
  })

  it('Should work with an immediately-satisfied condition', () => {
    const COOKIE_NAME = 'immediate-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then(cookieValue => expect(cookieValue.value).to.be.equal(EXPECTED_COOKIE_VALUE));
  })

  it('Should work with a condition satisfied after a random delay', () => {
    const COOKIE_NAME = 'after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then(cookieValue => expect(cookieValue.value).to.be.equal(EXPECTED_COOKIE_VALUE));
  })

  it('Should apply options correctly', () => {
    const COOKIE_NAME = 'after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'

    cy.once('fail', err => {
      expect(err.message).to.be.equal('Timed out retrying')
    })

    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction, {
      interval: 100,
      timeout: 900
    })
  })

  it('Should check value equality check', () => {
    const COOKIE_NAME = 'change-after-a-while-cookie'
    const EXPECTED_COOKIE_VALUE = '7'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then(cookieValue => expect(cookieValue.value).to.be.equal(EXPECTED_COOKIE_VALUE));
  })

  it('Should make the test fail with an unsatisfied condition', () => {
    const COOKIE_NAME = 'unknwon-cookie'
    const EXPECTED_COOKIE_VALUE = 'Set'

    cy.once('fail', err => {
      expect(err.message).to.be.equal('Timed out retrying')
    })

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === EXPECTED_COOKIE_VALUE)

    cy.waitUntil(checkFunction)
  })
})
