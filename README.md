# Birdseye
## _Tourism related website_

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

Birdseye is a tourism website. It is built using the popular MERN Stack technologies. This demo website is a full-stack website. It is built for the purpose of learning `React`, `Node.js`, `MongoDB`, and others tools and development packages.

### Live Demo

This project is deployed using the firebase hosting service. To visit the demo [Click](https://birdseye-travel-planner.web.app) here or manually visit the URL https://birdseye-travel-planner.web.app.

#### Demo Accounts

| Role | Email | Password |
| ------ | ------ | ------ |
| Admin | admin@birdseye.com | Admin1234# |
| Manager | manager@birdseye.com | Manager1234# |
| User | demo@birdseye.com | Demo1234# |

> **Note:** The website may be slow because of the free hosting server.

## Features

- Responsive webpages
- Authentication and Authorization
- File hosting
- REST api
- Database management
- Sorting and search plans
- Add new plans (Admin only)
- Editing plan details (Admin only)
- Make bookings
- Booking management
- User role management

This website is a fully responsive application. Attempts have been made to implement all basic concepts/services. 

## Tech

This project uses a number of open-source projects/packages to work properly:

### _Frontend_
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js.
- [Bootstrap](https://getbootstrap.com/) - Bootstrap is a powerful, feature-packed frontend toolkit.
- [Firebase](https://firebase.google.com/) - Firebase is an app development platform that helps to build apps and games.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React-bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework.
- [React-hook-form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [React-router](https://reactrouter.com/) - React Router is a standard library for routing in React.

### _Backend_
- [Colors](https://github.com/Marak/colors.js) - get colors in your node.js console.
- [CORS](https://github.com/expressjs/cors#readme) - Node.js CORS middleware.
- [Dotenv](https://github.com/motdotla/dotenv#readme) - Loads environment variables from .env for nodejs projects.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Firebase-admin](https://www.npmjs.com/package/firebase-admin) - Firebase Admin Node.js SDK.
- [Mongodb](https://www.npmjs.com/package/mongodb) - MongoDB NodeJS Driver.
- [Validator](https://github.com/validatorjs/validator.js) - A library of string validators and sanitizers.

## Installation and Development

Birdseye requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start.

### _Frontend_

```sh
# client
cd birdseye/client/
npm install
npm start
```

### _Backend_

```sh
# server
cd birdseye/server/
npm install
```

For production environments...

```sh
npm start

# or
NODE_ENV=production node index.js
```

For local environments...

```sh
npm run start-local

# or
NODE_ENV=local node index.js
```

For development environments...

```sh
npm run start-dev

# or
NODE_ENV=dev nodemon index.js
```

### Environment variables

Before starting, the servers must set up some environment variables on both the `birdseye/client` and `birdseye/server`.

#### _Frontend_

Enter all variables in the `client/.env.local` file.

| Variables | Description |
| ------ | ------ |
| REACT_APP_FIREBASE_APIKEY | Firebase api key |
| REACT_APP_FIREBASE_AUTHDOMAIN | Firebase auth domain |
| REACT_APP_FIREBASE_PROJECTID | Firebase project ID |
| REACT_APP_FIREBASE_STORAGEBUCKET | Firebase storage bucket |
| REACT_APP_FIREBASE_MESSAGINGSENDERID | Firebase messaging sender ID |
| REACT_APP_FIREBASE_APPID | Firebase APP ID |
| REACT_APP_SERVER_BACKEND_API_URL | Server side URL of birdseye |


#### _Backend_

Enter all variables in the `server/.env` file.

| Variables | Description |
| ------ | ------ |
| PORT | Port number for local |
| LOCAL_URI | MongoDB uri for local |
| DEV_URI | MongoDB uri for development |
| PRODUCTION_URI | MongoDB uri for production |
| FIREBASE_SERVICE_ACCOUNT_INFO | Firebase service account information |

**Thank you!**
