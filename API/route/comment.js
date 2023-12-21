const JWTMiddleWare = require("../middleware/IdentificationJWT");
const CommentController = require('../controller/commentDB');

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/:id', JWTMiddleWare.identification, CommentController.getComment);
router.get('/all/:id', JWTMiddleWare.identification, CommentController.getAllCommentsFromReviewId);

router.post('/', JWTMiddleWare.identification, upload.fields([
    {name:"content", maxCount :1},
    {name:"reviewId", maxCount :1}
]) , CommentController.postComment);
router.patch('/:id', JWTMiddleWare.identification, upload.fields([
    {name:"content", maxCount :1},
    {name:"authorId", maxCount :1},
    {name:"reviewId", maxCount :1}
]), CommentController.updateComment);

router.delete('/:id', JWTMiddleWare.identification, CommentController.deleteComment);

module.exports = router;