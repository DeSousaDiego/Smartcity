const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const CommentController = require('../controleur/commentDB');

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/:id', JWTMiddleWare.identification, CommentController.getComment);
router.get('/all/:id', JWTMiddleWare.identification, CommentController.getAllCommentsFromReviewId);

router.post('/', upload.fields([
    {name:"content", maxCount :1},
    {name:"reviewId", maxCount :1}
]) , JWTMiddleWare.identification, CommentController.postComment);
router.patch('/:id', upload.fields([
    {name:"content", maxCount :1},
    {name:"authorId", maxCount :1},
    {name:"reviewId", maxCount :1}
]), JWTMiddleWare.identification, CommentController.updateComment);

router.delete('/:id', JWTMiddleWare.identification, CommentController.deleteComment);

module.exports = router;