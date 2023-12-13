const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const reviewController = require("../controleur/reviewDB");

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/:id', JWTMiddleWare.identification, reviewController.getReview);
router.get('/', JWTMiddleWare.identification, reviewController.getAllReviews);

router.post('/', upload.fields([
    {name:"date", maxCount :1},
    {name:"rating", maxCount :1},
    {name:"title", maxCount :1},
    {name:"content", maxCount :1},
    {name:"user_id", maxCount :1},
    {name:"book_id", maxCount :1}
]) , JWTMiddleWare.identification, reviewController.postReview);

router.patch('/:id', upload.fields([
    {name:"rating", maxCount :1},
    {name:"title", maxCount :1},
    {name:"content", maxCount :1},
]) , JWTMiddleWare.identification, reviewController.updateReview);

router.delete('/:id', JWTMiddleWare.identification, reviewController.deleteReview);

module.exports = router;