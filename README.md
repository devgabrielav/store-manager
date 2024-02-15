# Project Store Manager

# Context
This is a Backend, CRUD project made with layered architecture, simulating a store with: products and sales.

On this application it's possible to: 
  - GET products and sales;
  - GET products based on query;
  - POST products and sales;
  - PUT products and sales;
  - DELETE products and sales.

## Used technologies

Back-end:

> Developed using: Javascript, Docker, NodeJS, ExpressJS, MYSQL, JWT

Tests:

> Developed using: Chai, Sinon

## Installing Dependencies

> After cloning the project

```bash
cd store-manager/backend
npm install
``` 
## Running the application with Docker
  
  ```
  docker compose up -d
  ```
Checking container logs
  ```
  docker logs -n 10 -f store_manager
  ```
## Running the application locally
  
  ```
  docker-compose up -d db
  ```
  > Then run
  
  ```
  npm run dev
  ```

## Running tests

Test

```
npm test
```

Coverage

```
npm run coverage
```
