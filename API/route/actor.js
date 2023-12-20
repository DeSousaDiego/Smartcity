const ActorController = require('../controller/actorDB');
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification,ActorController.getAllActors);

module.exports = router;