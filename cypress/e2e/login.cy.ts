
/// <reference types="cypress" />
describe('Login', () => {
  it('login', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="input-username"]').type('testaccount');
    cy.get('[data-testid="input-password"]').type('123123');
    cy.get('[data-testid="button-login"]').click();
    cy.wait(300);

    cy.get('[data-testid="navbar"]').should('exist');
  });
});