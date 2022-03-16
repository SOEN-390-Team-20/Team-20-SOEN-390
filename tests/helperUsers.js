const testPatients = {
  TEST_PATIENT1: {
    email: 'testpatient1@gmail.com',
    hin: 'TEST11010101',
    password: 'TestPatient1pass',
    firstName: 'Testpatientonefirst',
    lastName: 'Testpatientonelast',
    role: 'Patient',
    associated_users: [],
  },
  TEST_PATIENT2: {
    email: 'legit',
    hin: 'legit',
    password: 'legit',
    firstName: 'legit',
    lastName: 'legit',
    role: 'Patient',
  },
};

const testDoctors = {
  TEST_DOCTOR1: {
    email: 'testdoctor1@gmail.com',
    hin: '0101010101',
    password: 'TestDoctor1pass',
    firstName: 'Testdoctoronefirst',
    lastName: 'Testdoctoronelast',
    role: 'Doctor',
    associated_users: [],
  },
};

const testAdmins = {
  TEST_ADMIN1: {
    email: 'testadmin1@gmail.com',
    hin: 'ADMIN1',
    password: 'TestAdminPass',
    firstName: 'TestAdminOneFirst',
    lastName: 'TestAdminOneLast',
    role: 'admin',
    associated_users: [],
  },
};

module.exports = {
  testPatients,
  testDoctors,
  testAdmins,
};
