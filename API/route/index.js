const routeV1 = require('./routeV1');
const router = require("express").Router();
const routesVersioning = require('express-routes-versioning')();
const versionMiddleWare = require('../middleware/Versionning');

// Choisir la route en fonction de la version
router.use(versionMiddleWare.getVersion, routesVersioning({ 
   "1.0.0": routeV1}));

module.exports = router;