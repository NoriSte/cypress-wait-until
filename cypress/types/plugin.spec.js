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
cy.waitUntil(
  function() {
    return true;
  },
  { description: "Custom description" }
);
cy.waitUntil(
  function() {
    return true;
  },
  {
    logger: ({ name, message, consoleProps }) => {
      console.log({ name, message, consoleProps });
    }
  }
);
cy.waitUntil(
  function() {
    return true;
  },
  {
    log: false
  }
);
cy.waitUntil(
  function() {
    return true;
  },
  {
    customMessage: "custom message"
  }
);
