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

// Add options to the questions

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

// Add questions for inquirer

async function newQuestion() {
  const { menu } = await inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'what do you want to do?',
      choices: options,
    },
  ]);

  switch (menu) {
    case 'See list of all departments':
      await view('department');
      break;
    case 'See list of all job roles':
      await view('role');
      break;
    case 'See list of all employees':
      await view('employee');
      break;
    case 'Create a new department':
      await addDepartment();
      break;
    case 'Create a new job role':
      await addRole();
      break;
    case 'Create a new employee':
      await addEmployee();
      break;
    case 'update an employee role':
      await updateEmployee();
      break;
    case 'exit':
      exit();
      break;
  }
}
