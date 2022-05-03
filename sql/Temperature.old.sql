use Temperature;

CREATE TABLE Temperature (
  temperature_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  temperature INT NOT NULL,
  humidity INT NOT NULL,
  day_of_collection DATE NOT NULL
 );