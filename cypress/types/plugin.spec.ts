/// <reference types="Cypress" />

cy.waitUntil(() => true)
cy.waitUntil(() => false)
cy.waitUntil(() => Promise.resolve(true))
cy.waitUntil(() => Promise.resolve(false))

cy.waitUntil(() => true, {})
cy.waitUntil(() => false, {})
cy.waitUntil(() => Promise.resolve(true), {})
cy.waitUntil(() => Promise.resolve(false), {})


cy.waitUntil(() => true, { timeout: 500 })
cy.waitUntil(() => false)
cy.waitUntil(() => Promise.resolve(true))
cy.waitUntil(() => Promise.resolve(false))
