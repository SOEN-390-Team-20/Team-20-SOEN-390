/// <reference types="cypress" />

const usersHelper = require('../../tests/helperUsers');

const { TEST_PATIENT1 } = usersHelper.testPatients;
const { TEST_DOCTOR1 } = usersHelper.testDoctors;
const { TEST_ADMIN1 } = usersHelper.testAdmins;

describe('Test Admin Page', () => {
  beforeEach(() => {
    // Delete all previous users
    cy.request('DELETE', '/api/users');

    // Create TEST_ADMIN1
    cy.request(
      'POST',
      '/api/users',
      TEST_ADMIN1,
    ).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Add a Test Patient
    cy.request(
      'POST',
      '/api/users',
      TEST_PATIENT1,
    ).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Add a Test Doctor
    cy.request(
      'POST',
      '/api/users',
      TEST_DOCTOR1,
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Can use admin dashboard', () => {
    cy.visit('/');
    cy.contains('JeVaisBienAller');
    cy.contains('LOGIN');
    cy.contains('FORGOT PASSWORD?');
    cy.contains('CREATE NEW ACCOUNT');

    cy.get('input[name="email-field"]').type(TEST_ADMIN1.email);
    cy.get('input[name="password-field"]').type(TEST_ADMIN1.password);

    cy.get('button[name="login-button"]').click();

    // On the admin dashboard
  });
});
