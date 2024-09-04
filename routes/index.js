const express = require('express');
const Router = express.Router();

const profileRouter = require('./profile.route')

const routers = [
    {
        path: '/profile',
        router: profileRouter,
    },

];


routers.forEach((routerObject) => {
    Router.use(routerObject.path, routerObject.router);
});

module.exports = Router;