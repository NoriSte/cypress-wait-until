/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/')
  })

  it('Should work with an immediately-satisfied condition', () => {
    cy.get('#aa').click()

    cy.getCookie('immediate-cookie').then(cookieValue => {
      console.log('cookieValue', cookieValue)
      return cookieValue === 'Set'
    })
    console.log('AANN')

    cy.waitUntil(() => cy.getCookie('immediate-cookie').then(cookieValue => cookieValue.value === 'Set'));

    cy.getCookie('immediate-cookie').then(cookieValue => expect(cookieValue).to.be.equal('Set'));
  })

  it('Should work with a condition satisfied after a random delay', () => {

  })

  it('Should make the test fail with an unsatisfied condition', () => {

  })
})
