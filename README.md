# Birdseye: Tourism related website

![GitHub version](https://img.shields.io/github/package-json/v/Md-Dipu/birdseye)
![GitHub license](https://img.shields.io/github/license/Md-Dipu/birdseye)

Birdseye is a tourism website. It is built using the popular MERN Stack technologies. This demo website is a full-stack website. It is built for the purpose of learning `React`, `Node.js`, `MongoDB`, and other tools and development packages.

### Live Demo

This project is deployed using the Firebase hosting service. To visit the demo [Click here](https://birdseye-travel-planner.web.app) or manually visit the URL https://birdseye-travel-planner.web.app.

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
- REST API
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
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and Node.js.
- [Bootstrap](https://getbootstrap.com/) - Bootstrap is a powerful, feature-packed frontend toolkit.
- [Firebase](https://firebase.google.com/) - Firebase is an app development platform that helps to build apps and games.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React-bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework.
- [React-hook-form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [React-router](https://reactrouter.com/) - React Router is a standard library for routing in React.

### _Backend_
- [Colors](https://github.com/Marak/colors.js) - Get colors in your Node.js console.
- [CORS](https://github.com/expressjs/cors#readme) - Node.js CORS middleware.
- [Dotenv](https://github.com/motdotla/dotenv#readme) - Loads environment variables from .env for Node.js projects.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Firebase-admin](https://www.npmjs.com/package/firebase-admin) - Firebase Admin Node.js SDK.
- [MongoDB](https://www.npmjs.com/package/mongodb) - MongoDB Node.js Driver.
- [Validator](https://github.com/validatorjs/validator.js) - A library of string validators and sanitizers.

## Installation and Development

### Installation Steps

First, clone the repository:

```sh
git clone https://github.com/Md-Dipu/birdseye.git
cd birdseye
```

Ensure you are using the correct Node.js version:

```sh
nvm use
```

If the required Node.js version is not installed, use:

```sh
nvm install
```

Install the dependencies:

```sh
npm install
```

#### _Frontend_

Optionally, you can install dependencies for the `client`:

```sh
cd client
npm install
```

#### _Backend_

Optionally, you can install dependencies for the `server`:

```sh
cd server
npm install
```

### Environment Variables

Before starting, the servers must set up some environment variables on both the `birdseye/client` and `birdseye/server`.

#### _Frontend_

Enter all variables in the `client/.env.local` file.

| Variables | Description |
| ------ | ------ |
| REACT_APP_FIREBASE_APIKEY | Firebase API key |
| REACT_APP_FIREBASE_AUTHDOMAIN | Firebase auth domain |
| REACT_APP_FIREBASE_PROJECTID | Firebase project ID |
| REACT_APP_FIREBASE_STORAGEBUCKET | Firebase storage bucket |
| REACT_APP_FIREBASE_MESSAGINGSENDERID | Firebase messaging sender ID |
| REACT_APP_FIREBASE_APPID | Firebase APP ID |
| REACT_APP_SERVER_BACKEND_API_URL | Server side URL of Birdseye |

#### _Backend_

Enter all variables in the `server/.env` file.

| Variables | Description |
| ------ | ------ |
| PORT | Port number for local |
| LOCAL_URI | MongoDB URI for local |
| DEV_URI | MongoDB URI for development |
| PRODUCTION_URI | MongoDB URI for production |
| FIREBASE_SERVICE_ACCOUNT_INFO | Firebase service account information |

### Start Development

After setting up the environment variables for both the client and server side, start the development server:

```sh
npm start
```

#### _Frontend_

To start the frontend server, change to the `client` directory and use the following command:

```sh
cd client
npm start
```

Other available scripts are:

- `npm run build` - Builds the app for production.
- `npm run test` - Runs the test watcher in an interactive mode.
- `npm run eject` - Removes the single build dependency from your project.

#### _Backend_

To start the backend server, change to the `server` directory and use one of the following commands based on the environment:

```sh
cd server
npm run start-local
```

Other available scripts are:

- `npm start` - Starts the server in production mode.
- `npm run start-local` - Starts the server in local mode.
- `npm run start-dev` - Starts the server in development mode with nodemon.

## Contributing

We welcome contributions to Birdseye! If you have suggestions for improvements or have found a bug, please open an issue or submit a pull request. Here are some basic guidelines to follow:

1. **Fork the repository**: Create a personal fork of the project on GitHub.
2. **Clone your fork**: Clone your forked repository to your local machine.
3. **Create a branch**: Create a new branch for your changes.
4. **Make changes**: Make your changes in the new branch.
5. **Commit changes**: Commit your changes with a clear and concise commit message.
6. **Push to GitHub**: Push your changes to your forked repository on GitHub.
7. **Submit a pull request**: Open a pull request to merge your changes into the main repository.

Please ensure your code follows the project's coding standards and includes appropriate tests.

**Thank you!**
