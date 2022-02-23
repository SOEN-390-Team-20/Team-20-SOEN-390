/// <reference types="cypress" />

const usersHelper = require('../../tests/helperUsers');

// eslint-disable-next-line no-unused-vars
const { TEST_PATIENT1 } = usersHelper.testPatients;

describe('Test SignUp page', () => {
  before(() => {
    // Delete all previous users
    cy.request('DELETE', '/api/users');
  });

  beforeEach(() => {
    // Get to registration page
    cy.visit('/');
    cy.get('button[name="register-button"]').click();
  });

  it('Can Register a new user', () => {
    // Roles
    cy.contains('JeVaisBienAller');
    cy.contains('ROLE');
    cy.contains('Patient');
    cy.contains('Doctor').click();
    cy.contains('BACK');
    cy.contains('NEXT');

    // Next
    cy.get('button[name="next-button"]').click();

    // Personal Information
    cy.contains('JeVaisBienAller');
    cy.contains('INFORMATION');
    cy.get('input[name="firstName"]').type(TEST_PATIENT1.firstName);
    cy.get('input[name="lastName"]').type(TEST_PATIENT1.lastName);
    cy.get('input[name="hin"]').type(TEST_PATIENT1.hin);

    // Next
    cy.get('button[name="next-button"]').click();

    // Login Info
    cy.contains('JeVaisBienAller');
    cy.contains('LOGIN');
    cy.get('input[name="email"]').type(TEST_PATIENT1.email);
    cy.get('input[name="password"]').type(TEST_PATIENT1.password);

    // Next
    cy.get('button[name="next-button"]').click();

    // Verification Screen
    cy.contains('VERIFY');
    cy.contains('ACCOUNT DETAILS');
    cy.contains(TEST_PATIENT1.firstName);
    cy.contains(TEST_PATIENT1.lastName);
    cy.contains(TEST_PATIENT1.hin);
    cy.contains(TEST_PATIENT1.email);

    // Submit
    cy.get('button[name="submit-button"]').click();

    // Try to log with the user now
    cy.get('input[name="email-field"]').type(TEST_PATIENT1.email);
    cy.get('input[name="password-field"]').type(TEST_PATIENT1.password);
    cy.get('button[name="login-button"').click();

    cy.contains(TEST_PATIENT1.firstName);
  });
});
