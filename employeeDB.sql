DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(30) not null,
  PRIMARY KEY (id)
);

create table employee_role (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(30),
    salary DECIMAL,
    department_id int,
    index department_id (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id) on DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    index role_id (role_id),
    index manager_id (manager_id),
    FOREIGN KEY (role_id) REFERENCES employee_role(id) on DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) on DELETE CASCADE,
    PRIMARY KEY (id)
);

insert into department(name)
values("Sales")

insert into employee_role(title, salary, department_id)
values("Sales Manager", 30000, 1)

insert into employee(first_name, last_name, role_id, manager_id)
values("David", "Duarte", 1, null)