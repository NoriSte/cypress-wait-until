/// <reference types="Cypress" />
cy.waitUntil(function() {
  return true;
});
cy.waitUntil(function() {
  return false;
});
cy.waitUntil(function() {
  return Promise.resolve(true);
});
cy.waitUntil(function() {
  return Promise.resolve(false);
});
cy.waitUntil(function() {
  return true;
}, {});
cy.waitUntil(function() {
  return false;
}, {});
cy.waitUntil(function() {
  return Promise.resolve(true);
}, {});
cy.waitUntil(function() {
  return Promise.resolve(false);
}, {});
cy.waitUntil(
  function() {
    return true;
  },
  { timeout: 500 }
);
cy.waitUntil(
  function() {
    return false;
  },
  { timeout: 500 }
);
cy.waitUntil(
  function() {
    return Promise.resolve(true);
  },
  { timeout: 500 }
);
cy.waitUntil(
  function() {
    return Promise.resolve(false);
  },
  { timeout: 500 }
);
cy.waitUntil(
  function() {
    return true;
  },
  { errorMsg: "Custom error message" }
);
cy.waitUntil(
  function() {
    return false;
  },
  { errorMsg: "Custom error message" }
);
cy.waitUntil(
  function() {
    return Promise.resolve(true);
  },
  { errorMsg: "Custom error message" }
);
cy.waitUntil(
  function() {
    return Promise.resolve(false);
  },
  { errorMsg: "Custom error message" }
);
cy.waitUntil(() => true, { description: "Custom description" });
cy.waitUntil(() => true, {
  logger: ({ name, message, consoleProps }) => {
    console.log({ name, message, consoleProps });
  }
});
cy.waitUntil(() => true, {
  log: false
});
cy.waitUntil(() => true, {
  customMessage: "custom message"
});
cy.waitUntil(() => true, {
  verbose: true
});
cy.waitUntil(() => true, {
  customCheckMessage: "custom check message"
});
