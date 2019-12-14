var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "v02yrnuhptcod7dk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "enasobmi45rkn6q8",

  // Your password
  password: "vqhuggybv4jiu6ie",
  database: "vgj06603dziphyh8"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("********************************************\n")
  console.log("*                                          *\n")
  console.log("*             Employee Manager             *\n")
  console.log("*                                          *\n")
  console.log("********************************************")
  function start(){
    inquirer.prompt([
    {
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: ["View All Employees", "View Employees By Department", "View Employees By Manager", "Add New Employee", "View All Departments", "Add New Department", "View All Employee Roles", "Add New Employee Roles", "Exit"]
    }
  ])
    .then(function ({ task }) {
      switch (task) {
        case "View All Employees":
          viewEmployees();
          start();
          break;
        case "View Employees By Department":
          viewEmployeesDept();
          start();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          connection.end();
          break;
      }
    })
  }
  start();
  
  function viewEmployees() {
    connection.query("select * from employee", function (err, res) {
      if (err) throw err
      for (i = 0; i < res.length; i++) {
        console.log(res[i])
      }
    })
  }

  function viewEmployeesDept() {
    connection.query("select * from department", function(err, res){
      if (err) throw err
      var matchingValues = [];
      for(i=0; i<res.length; i++){
        matchingValues.push(res[i].name)
      }
      inquirer.prompt([
        {
          type: "list",
          name: "department",
          message: "Select a department to view employees",
          choices: matchingValues
        }
      ])
      .then(function({department}){
        connection.query("select * from employee inner join department on department.id where department.name = ?"), [department], function(err, res){
          if (err) throw err
          for(i=0; i<res.length; i++){
            console.log(res[i])
          }
        }
      })
    })
    
  }

});
