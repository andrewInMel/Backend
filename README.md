# Practice Project (Connectd) Backend

## Introduction

This is the backend repository for the practice project Connectd. Connectd is a personal CRM (customer relationship manager), created with React, Node.js, and MongoDB. 

_**P.S. This is a rewritten project. The original backend is written by Django and I was the frontend lead in the orginal project. The original team project is documented at: [**Confluence - Connectd CRM**](https://comp30022-079.atlassian.net/wiki/spaces/CRM/overview)**_

* Frontend repository is located at: [**Frontend Repository**](https://github.com/andrewInMel/Frontend)

* Backend repository is located at: [**Backend Repository**](https://github.com/andrewInMel/Backend)

* Frontend hosted on: [**Heroku - connectd-front**](https://connectd-front.herokuapp.com/)

* Backend hosted on: [**Heroku - connectdcrm**](https://connectdcrm.herokuapp.com/)

## About the backend server

The backend server of this project is built based on Node.js. The backend provides list of API endpoints to allow data exchange with frontend application, including **get**, **create**, **update** **&** **delete** **user's connections**, **tasks**, **groups**.

## Table of contents

- [Local Configuration](#local-configuration)
- [Features](#features)
- [API Endpoints](#api-endpoints)
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
    * improved security, such as, apply httpOnly, secure & samesite = none flags 
* Connections / Tasks / Users
    * get
    * create
    * Update
    * Delete

## API Endpoints

### Authentication
| Endpoint              | HTTP Verb  | Description                              |
| :------------         | :--------- | :------------                            |
| auth/login/           | POST       | Validate and log in the user             |
| auth/logout/          | GET        | Log out user with verification           |
| auth/google/          | GET        | navigate user to google api              |
| auth/google/callback/ | GET        | callback routes from google              |

### Connections
| Endpoint                      | HTTP Verb  | Description                                  |
| :------------                 | :--------- | :------------                                |
| api/connections/:connectionId | DELETE     | Remove a specific connection                 |
| api/connections/              | GET        | get all connections of an user               |
| api/connections/:connectionId | GET        | get the detail of a single connection        |
| api/connections/update        | POST       | update a single connection                   |
| api/connections/create        | POST       | create a new connection                      |


### Tasks
| Endpoint                      | HTTP Verb  | Description                                  |
| :------------                 | :--------- | :------------                                |
| api/connections/:connectionId | DELETE     | Remove a specific connection                 |
| api/connections/              | GET        | get all connections of an user               |
| api/connections/:connectionId | GET        | get the detail of a single connection        |
| api/connections/update        | POST       | update a single connection                   |
| api/connections/create        | POST       | create a new connection                      |

### Users
| Endpoint                      | HTTP Verb  | Description                                  |
| :------------                 | :--------- | :------------                                |
| api/connections/:connectionId | DELETE     | Remove a specific connection                 |
| api/connections/              | GET        | get all connections of an user               |
| api/connections/:connectionId | GET        | get the detail of a single connection        |
| api/connections/update        | POST       | update a single connection                   |
| api/connections/create        | POST       | create a new connection                      |



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
