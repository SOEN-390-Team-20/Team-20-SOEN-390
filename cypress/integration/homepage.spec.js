/// <reference types="cypress" />

describe('Navigation', () => {
  it('Can visit homepage', () => {
    cy.visit('/');
    cy.contains('JeVaisBienAller');
    cy.contains('Log In');
    cy.contains('Sign Up');
  });
});
