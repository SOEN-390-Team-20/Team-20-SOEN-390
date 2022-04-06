/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/// <reference types="cypress" />

const usersHelper = require('../../tests/helperUsers');

const { TEST_PATIENT1, TEST_PATIENT2 } = usersHelper.testPatients;

describe('Test Public Profile page', () => {
  beforeEach(() => {
    // Delete all previous users
    cy.request('DELETE', '/api/users');

    // Create TEST_PATIENT1
    cy.request(
      'POST',
      '/api/users',
      TEST_PATIENT1,
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Can login with proper user', () => {
    let publicLink = null;

    cy.request(
      'GET',
      '/api/users',
    ).then((response) => {
      const users = response.body;
      const userId = users[0]._id;
      publicLink = `/public/${userId}`;
    }).then(() => {
      cy.visit(publicLink);
    });

    cy.contains('Public Profile');
    cy.contains('Covid Status');
    cy.contains('Vaccine #1');
    cy.contains('Vaccine #2');
    cy.contains('Vaccine #3');
  });
});
