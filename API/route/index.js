// const UserRouter = require('./user');
// const CommentRouter = require('./comment');
// const BookRouter = require('./book');
// const RoleRouter = require('./role');
// const ActorRouter = require('./actor');
// const ReviewRouter = require('./review');
// const router = require("express").Router();

// router.use("/users", UserRouter);
// router.use("/comments", CommentRouter);
// router.use('/books', BookRouter);
// router.use('/roles', RoleRouter);
// router.use('/actors', ActorRouter);
// router.use("/reviews", ReviewRouter);

// module.exports = router;




// const UserRouter = require('./user');
// const CommentRouter = require('./comment');
// const BookRouter = require('./book');
// const RoleRouter = require('./role');
// const ActorRouter = require('./actor');
// const ReviewRouter = require('./review');
// const routesVersioning = require('express-routes-versioning')();
// const routeV1 = require('./routeV1');
// const router = require("express").Router();

// // Middleware pour gérer les versions (copiez-le depuis votre code existant)
// router.use(function(req, res, next) {
//    req.version = req.headers['accept-version'];
//    console.log("Voici la version : " , req.version);
//    next();
// });

// // Routes principales
// router.use(routesVersioning({  
//    "1.0.0": respondV1
// }));

// // Fonction de gestion pour la version 1
// function respondV1(req, res, next) { 
//    console.log("J execute le respondV1");
//    router.use(routeV1);
//    next();
// }

// module.exports = router;

// const routeV1 = require('./routeV1');
// const router = require("express").Router();

// // Middleware pour gérer les versions (copiez-le depuis votre code existant)
// router.use(function(req, res, next) {
//    req.version = req.headers['accept-version'];
//    console.log("Voici la version : " , req.version);
//    next();
// });

// // Routes principales
// router.use(routesVersioning({  
//    "1.0.0": respondV1
// }));

// // Fonction de gestion pour la version 1
// function respondV1(req, res, next) { 
//    console.log("J execute le respondV1");
//    next();
// }

// // Utilisez routeV1 comme middleware
// router.use(routeV1);

// module.exports = router;

const routeV1 = require('./routeV1');
const router = require("express").Router();
const routesVersioning = require('express-routes-versioning')();

// Middleware pour gérer les versions
router.use(function(req, res, next) {
   req.version = req.headers['accept-version'];
   console.log("Voici la version : " , req.version);
   if (!req.version) {
      console.log("J'ai beugé");
      res.status(400).send('Version number is required');
   } else {
      next();
   }
});

// Routes principales
router.use(routesVersioning({  
   "1.0.0": routeV1
}));

module.exports = router;