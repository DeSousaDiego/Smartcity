const pool = require('../modele/database');
const commentModele = require('../modele/commentDB');
const reviewModele = require('../modele/reviewDB');


module.exports.getAllReviews = async (req, res) => {
    if(req.session !== undefined){
    const client = await pool.connect();
    try{
        const {rows: reviews} = await reviewModele.getAllReviews(client);
        if(reviews.length > 0){
            // display all reviews
            console.log("reviews: ", reviews);
            res.json(reviews);
        } else {
            console.log("No review found");
            res.sendStatus(404);
        }    }
    catch (e) {
        console.error('Error in getAllReviews :', e.message);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
}


module.exports.getReview = async (req, res) => {
    if(req.session !== undefined){
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: comments} = await reviewModele.getReview(client, id);
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


module.exports.postReview = async (req, res) => {
    if(req.session !== undefined){
    const review = req.body;
    const client = await pool.connect();
    const userId = parseInt(req.session.id);
    console.log("userId: ", userId);
    try{
        const {rows} = await reviewModele.postReview(client, review.title, review.content, review.rating, userId, review.book_id);
        res.sendStatus(201).send(rows[0].id);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
}

module.exports.updateReview = async (req, res) => {
    if(req.session !== undefined){
    const review = req.body;
    const idReview = parseInt(req.params.id);
    console.log("idReview: ", idReview);
    console.log("review: ", review);
    const client = await pool.connect();
    try{
        await reviewModele.updateReview(client, idReview, review.title, review.content, review.rating);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
}

module.exports.deleteReview = async (req, res) => {
    if(req.session !== undefined){
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    const client = await pool.connect();

    try {
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        await client.query("BEGIN");
        await commentModele.deleteCommentsFromReview(client, id);
        await reviewModele.deleteReview(client, id);
        await client.query("COMMIT");

        res.sendStatus(204);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
};

