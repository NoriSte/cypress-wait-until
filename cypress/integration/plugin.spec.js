/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/')
  })

  it('Should work with an immediately-satisfied condition', () => {
    const COOKIE_NAME = 'immediate-cookie'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === 'Set')

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then(cookieValue => expect(cookieValue.value).to.be.equal('Set'));
  })

  it('Should work with a condition satisfied after a random delay', () => {
    const COOKIE_NAME = 'after-a-while-cookie'
    cy.get('#' + COOKIE_NAME).click()

    const checkFunction = () => cy.getCookie(COOKIE_NAME)
      .then(cookieValue => cookieValue && cookieValue.value === 'Set')

    cy.waitUntil(checkFunction)

    cy.getCookie(COOKIE_NAME).then(cookieValue => expect(cookieValue.value).to.be.equal('Set'));
  })

  it('Should make the test fail with an unsatisfied condition', () => {

  })
})
