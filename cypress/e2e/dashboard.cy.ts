describe("Login and Dashboard", () => {
  it("should allow a user to log in and view the dashboard", () => {
    cy.visit("/"); // Use baseUrl from cypress.config.ts

    // Check if the login form is visible
    cy.contains("h2", "Login").should("be.visible");
    cy.get("input#username").type("user");
    cy.get("input#password").type("password");
    cy.get("button").contains("Login").click();

    // After successful login, check if dashboard elements are visible
    cy.contains("h3", "Historical Timeline").should("be.visible");
    cy.contains("h3", "Alerts & Notifications").should("be.visible");
    cy.contains("h3", "Filter & Search").should("be.visible");
    cy.contains("h3", "Vehicle Statistics").should("be.visible");
  });
});


