const JWTMiddleWare = require("../middleware/IdentificationJWT");
const reviewController = require("../controller/reviewDB");

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ReviewFound'
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', JWTMiddleWare.identification, reviewController.getReview);

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/allReviewsFound'
 *       500:
 *         description: Some server error
 */
router.get('/', JWTMiddleWare.identification, reviewController.getAllReviews);

/**
 * @swagger
 * /reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/ReviewAAjoute'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ReviewAjoute'
 *       400:
 *         $ref: '#/components/responses/ErrorJWT'
 *       401:
 *         $ref: '#/components/responses/MissingJWT'
 *       403:
 *        $ref: '#/components/responses/mustBeAdmin'
 *       500:
 *         description: Internal error
 */
router.post('/', JWTMiddleWare.identification, upload.fields([
    {name:"date", maxCount :1},
    {name:"rating", maxCount :1},
    {name:"title", maxCount :1},
    {name:"content", maxCount :1},
    {name:"user_id", maxCount :1},
    {name:"book_id", maxCount :1}
]) , reviewController.postReview);

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the review to update
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/ReviewAUpdate'
 *     responses:
 *       204:
 *         $ref: '#/components/responses/ReviewUpdated'
 *       400:
 *         $ref: '#/components/responses/ErrorJWT'
 *       401:
 *         $ref: '#/components/responses/MissingJWT'
 *       403:
 *         $ref: '#/components/responses/mustBeAdmin'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal error
 */
router.patch('/:id', JWTMiddleWare.identification, upload.fields([
    {name:"rating", maxCount :1},
    {name:"title", maxCount :1},
    {name:"content", maxCount :1},
]) , reviewController.updateReview);

router.patch('/like/:id', JWTMiddleWare.identification, reviewController.addlike);
router.patch('/removeLike/:id', JWTMiddleWare.identification, reviewController.removelike);
router.patch('/dislike/:id', JWTMiddleWare.identification, reviewController.addDislike);
router.patch('/removeDislike/:id', JWTMiddleWare.identification, reviewController.removeDislike);


/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     tags: 
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The review id
 *     responses:
 *       204:
 *         $ref: '#/components/responses/ReviewDeleted'
 *       400:
 *         $ref: '#/components/responses/ErrorJWT'
 *       401:
 *         $ref: '#/components/responses/MissingJWT'
 *       403:
 *         $ref: '#/components/responses/mustBeAdmin'
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some error happened
 */
router.delete('/:id', JWTMiddleWare.identification, reviewController.deleteReview);

module.exports = router;