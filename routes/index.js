const express = require('express');
const Router = express.Router();

const profileRouter = require('./profile.route');
const registerRouter = require('./register.route');

const routes = [
    {
        path: '/profile',
        router: profileRouter
    },
    {
        path: '/register',
        router: registerRouter
    },
];

routes.forEach((routeObject) => {
    Router.use(routeObject.path, routeObject.router);
});

module.exports = Router;