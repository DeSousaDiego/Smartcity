const pool = require('../model/database');
const commentModele = require('../model/commentDB');
const ReviewModel = require('../model/reviewDB');
const { reviewSchema } = require('../schema/ValidationSchemas');

/**
 * @swagger
 * components:
 *  schemas:
 *     Review:
 *      type: object
 *      properties:
 *          id:
 *              type: integer
 *              description: The auto-generated id of the review
 *          title:
 *              type: string
 *              description: The title of the review
 *          content:
 *              type: string
 *              description: The content of the review
 *          rating:
 *              type: integer
 *              description: The rating of the review
 *          user_id:
 *              type: integer
 *              description: The id of the user who posted the review
 *          book_id:
 *              type: integer
 *              description: The id of the book reviewed
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         rating:
 *           type: integer
 *         user_id:
 *           type: integer
 *         book_id:
 *           type: integer
 */


/**
 * @swagger
 *  components:
 *     responses:
 *        allReviewsFound:
 *          description: renvoie toutes les reviews
 *          content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Review'
 */
module.exports.getAllReviews = async (req, res) => {
    if(req.session !== undefined){
    const client = await pool.connect();
    try{
        const {rows: reviews} = await ReviewModel.getAllReviews(client);
        if(reviews.length > 0){
            // display all reviews
            res.json(reviews);
        } else {
            res.sendStatus(404);
        }    
    } catch (error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
}


/** 
 * @swagger
 * components:
 *  responses:
 *      ReviewFound:
 *         description: renvoie une review
 *         content:
 *             application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Review'
*/
module.exports.getReview = async (req, res) => {
    if(req.session !== undefined){
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.status(400).json("L'id renseigné doit etre un nombre");
        } else {
            const {rows: comments} = await ReviewModel.getReview(client, id);
            const comment = comments[0];
            if(comment !== undefined){
                res.json(comment);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
}


/**  
 * @swagger
 * components:
 *  responses:
 *    ReviewAjoute:
 *     description: le review a été ajouté
 *  requestBodies:
 *   ReviewAAjoute:
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 * 
*/
module.exports.postReview = async (req, res) => {

    const review = req.body;
    const userId = parseInt(req.session.id);
    try{
        const newData = reviewSchema.parse({
            title: review.title,
            content: review.content,
            rating: parseInt(review.rating),
        })

        const client = await pool.connect();
        try{
            await ReviewModel.postReview(client, newData.title, newData.content, newData.rating, userId, review.book_id);
            res.sendStatus(201);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } catch (error){
        res.status(400).json("Erreur : le formulaire n'est pas valide");
        if (error.errors) {
            // Zod validation error contains an array of individual errors
            error.errors.forEach((validationError) => {
            console.error(`Validation Error for ${validationError.path.join('.')} : ${validationError.message}`);
            });
        } else {
            // Handle non-validation errors
            console.error(`Error during validation: ${error.message}`);
        } 
    } 
}


/** 
 * @swagger
 * components:
 *   responses:
 *     ReviewUpdated:
 *      description: review updated
 *   requestBodies:
 *     ReviewAUpdate:
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
*/
module.exports.updateReview = async (req, res) => {
    if(req.session !== undefined){
    const review = req.body;
    const idReview = parseInt(req.params.id);
    try{
        const newData = reviewSchema.parse({
            title: review.title,
            content: review.content,
            rating: parseInt(review.rating),
        })

        const client = await pool.connect();
        try{
            const {rows: reviews} = await ReviewModel.getReview(client, idReview);

            if(req.session.authLevel === 'admin' || req.session.id === reviews[0].user_id){
                try {
                    await ReviewModel.updateReview(client, idReview, newData.title, newData.content, newData.rating);
                    res.sendStatus(204);
                } catch (error){
                    console.error(error);
                    res.sendStatus(500);
                }
            } else {
                res.sendStatus(401);
            }
        } catch (error){
            res.sendStatus(403);
        } 
        finally {
            client.release();
        }
    } catch (error){
        res.status(400).json("Erreur : le formulaire n'est pas valide");
        if (error.errors) {
            // Zod validation error contains an array of individual errors
            error.errors.forEach((validationError) => {
            console.error(`Validation Error for ${validationError.path.join('.')} : ${validationError.message}`);
            });
        } else {
            // Handle non-validation errors
            console.error(`Error during validation: ${error.message}`);
        } 
    }
}
}


/**  
 * @swagger
 * components:
 *   responses:
 *    ReviewDeleted:
 *      description: le review a été supprimé
*/
module.exports.deleteReview = async (req, res) => {
    if(req.session !== undefined){
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    const client = await pool.connect();

    try {
        const {rows: reviews} = await ReviewModel.getReview(client, id);

        if(req.session.authLevel === 'admin' || req.session.id === reviews[0].user_id){
            try {
                if (isNaN(id)) {
                    res.status(400).json("L'id renseigné doit etre un nombre");
                } else {
                    await client.query("BEGIN");
                    await commentModele.deleteCommentsFromReview(client, id);
                    await ReviewModel.deleteReview(client, id);
                    await client.query("COMMIT");

                    res.sendStatus(204);
                }
            } catch (error) {
                await client.query("ROLLBACK");
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(403);
    } finally {
        client.release();
    }
}
};

