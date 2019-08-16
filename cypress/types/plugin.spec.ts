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
cy.waitUntil(() => false, { timeout: 500 })
cy.waitUntil(() => Promise.resolve(true), { timeout: 500 })
cy.waitUntil(() => Promise.resolve(false), { timeout: 500 })

cy.waitUntil(() => true, { errorMsg: "Custom error message" })
cy.waitUntil(() => false, { errorMsg: "Custom error message" })
cy.waitUntil(() => Promise.resolve(true), { errorMsg: "Custom error message" })
cy.waitUntil(() => Promise.resolve(false), { errorMsg: "Custom error message" })
