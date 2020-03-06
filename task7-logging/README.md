## Structure

This codebase includes the following:

```
├── app_config // contains Express middleware functions and configs.
├── config     // contains config object to manage different environments and sequilize configuration 
├── controllers
├── data-access  // contains sequilize model queries
├── database  // contains database configuration
├── data-seed  // contains all seed files
├── logs  // contains logs file in production environment
├── migrations  // contains all migration files
├── models  // contains all models for the project
├── router  // contains all route methods
├── types  // contains all types of Models
├── utils  // contains all utility functions
```

#### Node

Install the latest recommended (stable) version of Node.js.

#### PostgreSQL

Install the latest recommended (stable) version of PostgreSQL

#### Npm packages

Install all necessary npm packages either using yarn or npm:

```
yarn
```

or

```
npm install
```

#### Running the Project in dev mode

In order to run the Project in dev mode, execute the following command:

```
npm run start
```

#### Building

Use the following command to build the project:

```
npm run build
```

#### Linting

Use the following command to lint:

```
npm run lint
```

#### Running Seeds

In order to execute the seed files

```
npm run database-seed
```

#### Running Migrations

In order to execute the migrations files

```
npm run migrations
```
