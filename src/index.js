"use strict";

// log generico del comando <- da testaree √ e documentare X + nuova options logger X

function waitUntil(subject, checkFunction, options) {
  if (!(checkFunction instanceof Function)) {
    throw new Error("`checkFunction` parameter should be a function. Found: " + checkFunction);
  }
  options = options || {};

  const TIMEOUT_INTERVAL = options.interval || 200;
  const TIMEOUT = options.timeout || 5000;
  const ERROR_MSG = options.errorMsg || "Timed out retrying";
  const LOG_DESCRIPTION = options.description || "waitUntil";
  const LOG = options.log === false ? false : true;
  const MESSAGE = [options.customMessage, options].filter(Boolean);
  let retries = Math.floor(TIMEOUT / TIMEOUT_INTERVAL);

  const logger = options.logger || Cypress.log;

  if (LOG) {
    logger({
      name: LOG_DESCRIPTION,
      message: MESSAGE,
      consoleProps: () => ({
        options
      })
    });
  }

  const check = result => {
    if (result) {
      return result;
    }
    if (retries < 1) {
      throw new Error(ERROR_MSG);
    }
    cy.wait(TIMEOUT_INTERVAL, { log: false }).then(() => {
      retries--;
      return resolveValue();
    });
  };

  const resolveValue = () => {
    const result = checkFunction(subject);

    const isAPromise = Boolean(result && result.then);

    if (isAPromise) {
      return result.then(check);
    } else {
      return check(result);
    }
  };

  return resolveValue();
}

Cypress.Commands.add("waitUntil", { prevSubject: "optional" }, waitUntil);
