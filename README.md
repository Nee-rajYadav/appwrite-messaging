# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install` 

To install all the required packages.



### `npm install nodemon`

Makes nodemon ready to update the server when evver it is requiired without havin to load the server repeatidily.


Make sure that these dependencies are off the same version.
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "node-appwrite": "^13.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "run": "^1.5.0",
    "uuid4": "^2.0.3",
    "web-vitals": "^2.1.4"

Modify in pakage json: 

"scripts": {
    "start:frontend": "react-scripts start",
    "start:backend": "nodemon server.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  this is done to ensure both frontend and backend can on the same app.


### `npm run start:backend`

Starts the backend of the project.

### `npm run start:frontend`

Start the react app.