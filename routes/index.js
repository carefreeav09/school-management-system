const express = require('express');
const placesRoutes = require('./places-routes');
const usersRouter = require('./users-routes');

const router = express.Router();

const appRoutes = [
    {
        path: '/places',
        route: placesRoutes,
    },
    {
        path: '/users',
        route: usersRouter,
    }
]

appRoutes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;