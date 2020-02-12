CREATE TABLE pisteet (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255),
  pisteet INT
);

INSERT INTO pisteet (username, pisteet)
VALUES  ('testipena', 20);