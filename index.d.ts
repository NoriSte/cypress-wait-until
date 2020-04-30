/// <reference types="Cypress" />

type WaitUntilLog = Pick<
  Cypress.LogConfig,
  "name" | "message" | "consoleProps"
>;

type ErrorMsgCallback = (result: any, options: any) => string;

interface WaitUntilOptions {
  timeout?: number;
  interval?: number;
  errorMsg?: string | ErrorMsgCallback;
  description?: string;
  customMessage?: string;
  verbose?: boolean;
  customCheckMessage?: string;
  logger?: (logOptions: WaitUntilLog) => any;
  log?: boolean;
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    waitUntil<Subject>(
      checkFunction: () => Subject | Chainable<Subject> | Promise<Subject>,
      options?: WaitUntilOptions
    ): Chainable<Subject>;
  }
}
