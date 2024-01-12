const RoleController = require('../controller/roleDB');
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification, RoleController.getRoles);

module.exports = router;