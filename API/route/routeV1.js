// routeV1.js
const UserRouter = require('./user');
const CommentRouter = require('./comment');
const BookRouter = require('./book');
const RoleRouter = require('./role');
const ActorRouter = require('./actor');
const ReviewRouter = require('./review');
const express = require('express');
const routeV1 = express.Router();

// Définir les routes spécifiques à la version 1
routeV1.use("/user", UserRouter);
routeV1.use("/comment", CommentRouter);
routeV1.use('/book', BookRouter);
routeV1.use('/role', RoleRouter);
routeV1.use('/actor', ActorRouter);
routeV1.use("/review", ReviewRouter);

module.exports = routeV1;
