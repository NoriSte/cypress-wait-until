"use strict";

// log generico del comando <- da testaree √ e documentare X + nuova options logger X
// agiungere un log verboso per debug

function waitUntil(subject, checkFunction, options = {}) {
  if (!(checkFunction instanceof Function)) {
    throw new Error("`checkFunction` parameter should be a function. Found: " + checkFunction);
  }
  const defaultOptions = {
    interval: 200,
    timeout: 5000,
    errorMsg: "Timed out retrying",
    description: "waitUntil",
    log: true,
    customMessage: undefined,
    logger: Cypress.log
  };

  const o = { ...defaultOptions, ...options };

  o.customMessage = [options.customMessage, options].filter(Boolean);

  let retries = Math.floor(o.timeout / o.interval);

  if (o.log) {
    o.logger({
      name: o.description,
      message: o.message,
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
      throw new Error(o.errorMsg);
    }
    cy.wait(o.interval, { log: false }).then(() => {
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

  // return new Promise(resolve => {
  //   resolveValue().then(value => {
  //     console.log(value);
  //     resolve(value);
  //   });
  // });
}

Cypress.Commands.add("waitUntil", { prevSubject: "optional" }, waitUntil);
