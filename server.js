// module variables
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
const PORT = process.env.PORT || 3001;

// connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "mysqlpass",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database.")
);

// opening prompts and paths to answer functions
const openingQuestion = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do today?",
        name: "choices",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
        ],
      },
    ])
    .then((choice) => {
      const { choices } = choice;
      if (choices === "View All Departments") {
        getDepartments();
      }
      if (choices === "View All Roles") {
        getRoles();
      }
      if (choices === "View All Employees") {
        getEmployees();
      }
      if (choices === "Add A Department") {
        addDepartments();
      }
      if (choices === "Add A Role") {
        addRoles();
      }
      if (choices === "Add An Employee") {
        addEmployees();
      }
      if (choices === "Update An Employee Role") {
        updateEmployeeRole();
      }
    });
};

// get department table
getDepartments = () => {
  console.log("All Departments");
  db.query("SELECT id, name FROM department;", function (err, results) {
    console.table(results);
    openingQuestion();
  });
};

// get roles table
getRoles = () => {
  console.log("All Roles");
  db.query(
    "SELECT employee_role.id, employee_role.title, department.name, employee_role.salary FROM employee_role INNER JOIN department ON employee_role.id=department.id;",
    function (err, results) {
      console.table(results);
      openingQuestion();
    }
  );
};

// get employees table
getEmployees = () => {
  console.log("All Employees");
  db.query("select employee_role.id, employee.first_name, employee.last_name, employee_role.title, employee_role.department_id, employee_role.salary, employee.manager_id from employee_role join employee on employee_role.id=employee.id;", function (err, results) {
    console.table(results);
    openingQuestion();
  });
};

// add new department
addDepartments = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "Which Department Would You LIke To Add?",
      },
    ])
    .then((answer) => {
      let depName = answer.addDepartment
      db.query(
        "INSERT INTO department (name) VALUES (?);", depName,
        function (err, answer) {
          getDepartments();
        }
      );
    });
};

// add role
addRoles = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What Is The Role You Would Like To Add?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What Is The Salary For This Role?",
      },
      {
        type: "input",
        name: "roleDep",
        message: "What Department Is This Role In?",
      },
    ])
    .then((answers) => {
      let title = answers.roleTitle;
      let salary = answers.roleSalary;
      let roleDep = answers.roleDep;
      db.query(
        "INSERT INTO role (title) VALUES (?);",
        title,
        "INSERT INTO role (salary) VALUES (?);",
        salary,
        "INSERT INTO role (department_id) VALUES (?);",
        roleDep,
        function (err, answer) {
          getRoles();
        }
      );
    });
};

// add employee
addEmployees = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What Is The Employees First Name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What Is The Employees Last Name?",
      },
      {
        type: "input",
        name: "empRole",
        message: "What Is The Employees Role?",
      },
      {
        type: "input",
        name: "empManager",
        message: "Who Is The Employees Manager?",
      },
    ])
    .then((answers) => {
      let firstName = answers.firstName;
      let lastName = answers.lastName;
      let empRole = answers.empRole;
      let empManager = answers.empManager;
      db.query(
        "INSERT INTO employee (first_name) VALUES (?);", firstName,
        "INSERT INTO employee (Last_name) VALUES (?);", lastName,
        "INSERT INTO employee (role_id) VALUES (?);", empRole,
        "INSERT INTO employee (manager_id) VALUES (?);", empManager,
        roleDep,
        function (err, answer) {
          getEmployees();
        }
      );
    });
};

// update employee
updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What Is The Employees New Role?",
      },
    ])
    .then((answers) => {
      let newRole = answers.newRole;
      db.query(
        "UPDATE employee SET role_id WHERE id = ?;", newRole,
        function (err, answer) {
          getRoles();
        }
      );
    });
};

// initialize prompt
function init() {
  openingQuestion();
}

init();
