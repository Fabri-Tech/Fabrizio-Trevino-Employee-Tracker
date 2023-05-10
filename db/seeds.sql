VALUES ("Marketing"),
       ("Finance"),
       ("Research and Development"),
       ("Human Resources"),
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Director", 120000, 1),
       ("Financial Controller", 95000, 2),
       ("Lead Research Scientist", 85000, 3),
       ("HR Director", 110000, 4),
       ("Engineering Manager", 135000, 5);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Smith", 1, NULL),
       ("Rachel", "Lee", 2, 1),
       ("Mark", "Hamill", 3, 1),
       ("Jennifer", "Lopez", 4, 1),
       ("Peter", "Garcia", 5, 1);
