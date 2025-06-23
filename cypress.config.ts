import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://169.254.0.21:5173", // Set the base URL for Cypress tests
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});


