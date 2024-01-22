# Simple-Translator
Enter you rapid API key in the /site/key.txt
Edit the /Docker/.env with a mysql password of your choise.
To build the Docker image run in the project main folder:
docker build -t simple-translator -f Docker/Dockerfile .
Then run in /Docker docker-compose up -d 
The site is accessible via:
http://localhost:3000/

To access the mysql DB:
docker exec -it docker-mysql1  mysql -u root -p
Password is the one you chose under MYSQL_ROOT_PASSWORD
Then run:
use translations;
select * from requests;