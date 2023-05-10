const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    // hide the password
    password: process.env.EMPLOYEE_DB_PASSWORD,
    database: 'employee_db',
  },
  () => {
    console.log(`Welcome to the employee database.`);
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

async function view(table) {
  const result = await dbQuery(`SELECT * FROM ${table}`);
  console.table(result);
  await newQuestion();
}

async function dbQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function addDepartment() {
  const { newDepartment } = await inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'Please add the desired department',
    },
  ]);

  const result = await dbQuery('INSERT INTO departments (name) VALUES (?)', [
    newDepartment,
  ]);
  console.table(result);
  await newQuestion();
}

// Add other functions here...

function exit() {
  console.log('See you soon');
  process.exit();
}

newQuestion().catch((err) => {
  console.error('An error occurred: ', err);
  process.exit(1);
});

// Add a department
async function addDepartment() {
  const { newDepartment } = await inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'Please add the desired department',
    },
  ]);

  const result = await dbQuery('INSERT INTO department (name) VALUES (?)', [
    newDepartment,
  ]);
  console.table(result);
  await newQuestion();
}

// Add a role
async function addRole() {
  const departments = await dbQuery('SELECT * FROM department');

  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Please add the role title',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please add the role salary',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Please choose the department',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);

  const result = await dbQuery(
    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    [title, salary, department_id]
  );

  console.table(result);
  await newQuestion();
}

// Add an employee

async function addEmployee() {
  const roles = await dbQuery('SELECT * FROM role');
  const employees = await dbQuery('SELECT * FROM employee');

  const { firstName, lastName, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Please add the first name',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Please add the last name',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Please choose the role',
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Please choose the manager',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    },
  ]);

  const result = await dbQuery(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [firstName, lastName, role_id, manager_id]
  );

  console.table(result);
  await newQuestion();
}

// Add employee role
async function updateEmployee() {
  const roles = await dbQuery('SELECT * FROM role');
  const employees = await dbQuery('SELECT * FROM employee');

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Please choose the employee to update',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Please choose the new role',
      choices: roles.map((role) => ({
        name: role.title,
        value: role.id,
      })),
    },
  ]);

  const result = await dbQuery('UPDATE employee SET role_id = ? WHERE id = ?', [
    role_id,
    employee_id,
  ]);

  console.table(result);
  await newQuestion();
}
