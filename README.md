# Simple-Translator
Enter you rapid API key in the key.txt
To build the Docker image run in the site folder:
docker build -t simple-translator .
In the Docker folder create a .env file with the following enviromenl variable:
MYSQL_ROOT_PASSWORD=Your-Password-Here
Then run: docker-compose up -d 
The site is accessible via:
http://localhost:3000/

To access the mysql DB:
docker exec -it docker-mysql1  mysql -u root -p
Password is the one you chose under MYSQL_ROOT_PASSWORD
Then run:
use translations;
select * from requests;