const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
  },
  () => {
    console.log(`Welcome to the employee_db database.`);
  }
);

// Add options to the inquiries

const options = [
  'See list of all departments',
  'See list of all job roles',
  'See list of all employees',
  'Create a new department',
  'Create a new job role',
  'Create a new employee',
  'Modify an employee role',
  'exit',
];
