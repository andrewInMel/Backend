# Practice Project (Connectd) Backend

## Introduction

This is the back end repository for the practice project Connectd. This is a personal CRM (customer relationship manager), created with React, Node.js, and MongoDB.

* Frontend repository is located at: [**Frontend Repository**](https://github.com/andrewInMel/Frontend)

* Backend repository is located at: [**Backend Repository**](https://github.com/andrewInMel/Backend)

* Frontend hosted on: [**Heroku - connectd-front**](https://connectd-front.herokuapp.com/)

* Backend hosted on: [**Heroku - connectdcrm**](https://connectdcrm.herokuapp.com/)

* The original team project is documented at: [**Confluence - Connectd CRM**](https://comp30022-079.atlassian.net/wiki/spaces/CRM/overview)

## About the backend server

The backend server of our CRM is built based on Node.js. The backend provides list of API endpoints to allow data exchange with frontend application, including **retrieve**, **create**, **update** and **delete** user's **connections**, **tasks**, **groups**.

## Table of contents

- [Local Configuration](#local-configuration)
- [Features](#features)
- [API Endpoints](#API-endpoints)
- [Authentication System](#authentication-system)
- [Module Structure](#module-structure)
- [Tool Stack](#tool-stack)
- [Useful Links](#useful-links)

## Local Configuration:

**Pre-requirement:**
1. Node.js.
2. `npm` or `yarn` as the package manager.
3. Terminal
4. Git
5. A code editor (optional).

**Steps:**
1. Pull the backend repository from GitHub
    * You may use command `git clone <repo>` if you haven’t cloned the repository before
    * Or simply run `git pull` to fetch the latest commit
2. In the folder of the project, run `npm install` or `yarn` to install all dependancies.
3. Run command `node app.js` to run the backend server, 
    * By default, the server will run on port `5000` or `process.env.PORT`
   
## Features
* User management
    * Register
    * Log in
    * Log out
* Authentication
    * cookie authentication  
    * google login enabled through Oauth2.0
    * improved security, such as, aplly httpOnly, secure & samesite = none flags 
* Connections / Tasks / Users
    * get
    * create
    * Update
    * Delete

## API Endpoints

[**Swagger**](https://connectdcrm.herokuapp.com/) has been implemented as the API documentation tool which is also hosted on Heroku. Swagger is an UI friendly documentation tool for APIs and allows to visualise and interact with the API’s resources directly. It lists all the API endpoints showed below and can be accessed through the main page of backend server [**here**](https://connectdcrm.herokuapp.com/).
### Authentication
| Endpoint       | HTTP Verb  | Description                              |
| :------------  | :--------- | :------------                            |
| auth/register/ | POST       | Register a new user with email and name  |
| auth/login/    | POST       | Validate and log in the user             |
| auth/logout/   | POST       | Log out user with verification            |

### Connections
| Endpoint                  | HTTP Verb  | Description                                  |
| :------------             | :--------- | :------------                                |
| api/connections/          | POST       | Create a new connection                      |
| api/connections/          | GET        | Get a list of all connections                |
| api/connections/:id       | GET        | Retrieve a specific connection                |
| api/connections/?userId=  | GET        | Get a user's all connections                 |
| api/connections/:id       | PATCH      | Update a specific connection's information    |
| api/connections/:id       | DELETE     | Remove a specific connection                  |
| api/connections/?userId=  | DELETE     | Remove all connections belong to this user   |

### Tasks
| Endpoint            | HTTP Verb  | Description                            |
| :------------       | :--------- | :------------                          |
| api/tasks/          | POST       | Create a new task                      |
| api/tasks/          | GET        | Get a list of all tasks                |
| api/tasks/:id       | GET        | Retrieve a specific task                |
| api/tasks/?userId=  | GET        | Get a user's all tasks                 |
| api/tasks/:id       | PATCH      | Update a specific task's information    |
| api/tasks/:id       | DELETE     | Remove a specific task                  |
| api/tasks/?userId=  | DELETE     | Remove all tasks belong to this user   |



## Authentication System


## Module Structure



## Tool Stack

Express has been chosen as the framework for backend development. Some main packages installed for various functionalities are listed below:

| Package               | Version  | Notes                             |
| :------------         | :------- | :------------                     |
| express               | 4.17.1   | Backend web application framework |
| Mongoose              | 6.0.12   | A MongoDB object modeling tool    |
| passport              | 0.5.0    | Authentication middleware         |
| mongodb               | 4.1.4    | NoSQL database                    |
| cors                  | 2.8.5    | Enable CORS with various options  |

----------------------------------------------------

## Useful Links

Git official website: https://git-scm.com/

VSCode official website: https://code.visualstudio.com/

NodeJS official website: https://nodejs.org/en/

Heroku official website: https://www.heroku.com/

Heroku command line tool: https://devcenter.heroku.com/categories/command-line

Heroku CLI Commands: https://devcenter.heroku.com/articles/heroku-cli-commands

Mongoose: https://mongoosejs.com/docs/
