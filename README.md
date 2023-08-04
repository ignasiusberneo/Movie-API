# Movie API

## Table of Contents

- [Project Title](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)

## Installation

- npm install
- Configure database configuration on config/config.json (development and test section)
- Run following on terminal:
    - sequelize db:create
    - sequelize db:create --env test
    - sequelize db:migrate
    - sequelize db:migrate --env test

## Usage

npm start

[FOR UNIT TESTING PURPOSE]
Change you **NODE_ENV** value to **test** and run **npm test**
If you want to run API change back **NODE_ENV** value to **development** or leave it empty

## Features
List of API:
- GET /movies => Get all movies
- GET /movies/:id => Get  movie by id
- POST /movies => Add movie
- PATCH /movies/:id => Edit movie by id
- DELETE /movies/:id => Delete movie by id







