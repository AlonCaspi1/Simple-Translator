# Simple-Translator
Enter you rapid API key in the key.txt and start translating.
To build the Docker image run in the site folder:
docker build -t simple-translator .
Then run: docker-compose up -d in the Docker folder
The site is accessible via:
http://localhost:3000/
To access the mysql DB:
docker exec -it docker-mysql1  mysql -u root -p
Password is abc123
use translations;
select * from requests;