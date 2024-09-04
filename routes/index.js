const express = require('express');
const Router = express.Router();

const profileRouter = require('./profile.route');

const routes = [
    {
        path: '/profile',
        router: profileRouter
    }
];

routes.forEach((routeObject) => {
    Router.use(routeObject.path, routeObject.router);
});

module.exports = Router;