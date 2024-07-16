/// <reference types="cypress" />

cy.waitUntil(() => true)
cy.waitUntil(() => Promise.resolve(true))

cy.waitUntil(() => true, {})
cy.waitUntil(() => Promise.resolve(true), {})

cy.waitUntil(() => true, { timeout: 500 })
cy.waitUntil(() => Promise.resolve(true), { timeout: 500 })

cy.waitUntil(() => true, { errorMsg: 'Custom error message' })
cy.waitUntil(() => Promise.resolve(true), { errorMsg: 'Custom error message' })

cy.waitUntil(() => true, { errorMsg: () => 'Custom error message' })
cy.waitUntil(() => Promise.resolve(true), {
  errorMsg: () => 'Custom error message',
})
cy.waitUntil(() => Promise.resolve(true), {
  errorMsg: () => 'Custom error message',
})
cy.waitUntil(() => true, {
  errorMsg: (
    _result: any,
    {
      timeout,
      interval,
    }: {
      timeout: number
      interval: number
    }
  ) => 'Custom error message',
})

cy.waitUntil(() => true, { description: 'Custom description' })

cy.waitUntil(() => true, {
  logger: ({ name, message, consoleProps }) => {
    console.log({ name, message, consoleProps })
  },
})

cy.waitUntil(() => true, { log: false })
cy.waitUntil(() => true, { customMessage: 'custom message' })

// below there are the same tests but leveraging the TS Generic

cy.waitUntil<boolean>(() => true)
cy.waitUntil<boolean>(() => Promise.resolve(true))
cy.waitUntil<boolean>(() => true, {})
cy.waitUntil<boolean>(() => Promise.resolve(true), {})
cy.waitUntil<boolean>(() => true, { timeout: 500 })
cy.waitUntil<boolean>(() => Promise.resolve(true), { timeout: 500 })
cy.waitUntil<boolean>(() => true, { errorMsg: 'Custom error message' })
cy.waitUntil<boolean>(() => Promise.resolve(true), { errorMsg: 'Custom error message' })
cy.waitUntil<boolean>(() => true, { errorMsg: () => 'Custom error message' })
cy.waitUntil<boolean>(() => Promise.resolve(true), {
  errorMsg: () => 'Custom error message',
})
cy.waitUntil<boolean>(() => true, {
  errorMsg: (
    _result: boolean,
    {
      timeout,
      interval,
    }: {
      timeout: number
      interval: number
    }
  ) => 'Custom error message',
})
cy.waitUntil<boolean>(() => true, { description: 'Custom description' })
cy.waitUntil<boolean>(() => true, {
  logger: ({ name, message, consoleProps }) => {
    console.log({ name, message, consoleProps })
  },
})
cy.waitUntil<boolean>(() => true, { log: false })
cy.waitUntil<boolean>(() => true, { customMessage: 'custom message' })

cy.wrap('').waitUntil((subject) => subject.length)
cy.wrap('').waitUntil<boolean>((subject) => !!subject.length)
cy.wrap<string>('').waitUntil<boolean>((subject) => !!subject.length)
cy.wrap<string>('').waitUntil((subject) => subject.length)

cy.waitUntil(() => cy.task<number>('myTaskReturningANumber')).then((subject) => {
  subject * subject
})
