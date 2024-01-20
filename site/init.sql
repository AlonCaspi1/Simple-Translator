use translations;
CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sourcelanguage VARCHAR (2), targetlanguage VARCHAR (2), 
    textinput VARCHAR (70), textoutput VARCHAR (70)

);