INSERT INTO department (name)
VALUES ("Engineering"),
       ("Legal"),
       ("Finance"),
       ("Sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Engineer", 100000, 1),
       ("Legal Team Lead", 250000, 2),
       ("Legal Assistant", 200000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 80000, 3),
       ("Sales Lead", 100000, 4),
       ("Sales", 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ian", "Nicholas", 1, 1),
       ("Bobbie", "Domingo", 2, null),
       ("Emma", "Nicholas", 3, 3),
       ("Amy", "Tisland", 4, null),
       ("Neida", "Garcia", 5, 5),
       ("Ryan", "Kelley", 6, null),
       ("Lila", "Demers", 7, 7),
       ("Mark", "Burton", 8, null);