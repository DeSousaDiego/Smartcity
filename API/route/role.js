const RoleControlleur = require('../controleur/roleDB');
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification, RoleControlleur.getRoles);

module.exports = router;