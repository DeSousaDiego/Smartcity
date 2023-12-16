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
routeV1.use("/users", UserRouter);
routeV1.use("/comments", CommentRouter);
routeV1.use('/books', BookRouter);
routeV1.use('/roles', RoleRouter);
routeV1.use('/actors', ActorRouter);
routeV1.use("/reviews", ReviewRouter);

module.exports = routeV1;
