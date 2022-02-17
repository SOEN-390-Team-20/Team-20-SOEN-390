/// <reference types="cypress" />

describe('Homepage', () => {
  it('Can visit homepage', () => {
    cy.visit('/');
    cy.contains('JeVaisBienAller');
  });
});
