const express = require('express');
const Router = express.Router();

const profileRouter = require('./profile.route');
const registerRouter = require('./register.route');
const authRouter = require('./auth.route');
const verifyRouter = require('./verify.route');
const serviceRouter = require('./service.route');
const orderRouter = require('./order.route');
const resetRouter=require("./reset.route");

const routes = [
    {
        path: '/profile',
        router: profileRouter
    },
    {
        path: '/register',
        router: registerRouter
    },
    {
        path: '/auth',
        router: authRouter
    },
    {
        path: '/verify',
        router: verifyRouter
    },
    {
        path: '/service',
        router: serviceRouter
    },
    {
        path: '/order',
        router: orderRouter
    },
    {
        path: '/reset',
        router: resetRouter
    },


];

routes.forEach((routeObject) => {
    Router.use(routeObject.path, routeObject.router);
});

module.exports = Router;