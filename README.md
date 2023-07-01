# README

### Requirements
---
In order to run the fullstack you will require Docker to be installed on your machine.

You can find it here:
https://www.docker.com/products/docker-desktop/


Once you have Docker Desktop installed and open, do as below:

---
 
### Startup Instructions

---

- Open a new terminal 
- Navigate to the root directory of this project, containing the `docker-compose.yml` file
- Enter the following command: `docker-compose up --build -d`

At this point docker will begin spinning up 3 containers for the `api`, `db` & `fe` components of the project.

- Wait for the logs to report that the three projects have started, as below: 
```
[+] Running 3/3
 - Container interview-mongo-1 Started
 - Container interview-api-1   Started
 - Container interview-app-1   Started
```
- Open your preferred browser and navigate to localhost:3000 (http://localhost:3000/)

---
When you're finished, type `docker-compose down`, or close docker-desktop on your machine.