const pool = require('../model/database');
const commentModele = require('../model/commentDB');
const { commentSchema } = require('../schema/ValidationSchemas');


module.exports.getComment = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.status(400).json("l'id doit etre un nombre");
        } else {
            const {rows: comments} = await commentModele.getComment(client, id);
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

module.exports.getAllCommentsFromReviewId  = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; // attention ! Il s'agit de texte !
    const id = parseInt(idTexte);

    try {
        if (isNaN(id)) {
            res.status(400).json("l'id doit etre un nombre");
        } else {
            const { rows: comments } = await commentModele.getAllCommentsFromReviewId(client, id);

            if (comments.length > 0) {
                // Si des commentaires sont trouvés, renvoyer tous les commentaires
                res.json(comments);
            } else {
                // Si aucun commentaire n'est trouvé, renvoyer un statut 404
                res.sendStatus(404);
            }
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};



module.exports.postComment = async (req, res) => {
    // const body = req.body;
    const {content, review_id} = req.body;
    const user_id = parseInt(req.session.id);
    try{
        const newData = commentSchema.parse({
            content,
        });

        const client = await pool.connect();
        try{
            await commentModele.postComment(client, newData.content, user_id, review_id);
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

module.exports.updateComment = async (req, res) => {
    const {id, content} = req.body;
    const user_id = parseInt(req.session.id); 
    try{
        const newData = commentSchema.parse({
            content,
        });

        const client = await pool.connect();
        try{
            const rows = commentModele.getComment(client, id)

            if(req.session.authLevel === 'admin' || user_id === rows[0].user_id){
                try{
                    await commentModele.updateComment(client, id, newData.content, user_id);
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

module.exports.deleteComment = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    const client = await pool.connect();
    try{
        const commentRows = commentModele.getComment(client, id);

        if(req.session.authLevel === 'admin' || user_id === commentRows[0].user_id){
            try{
                if(isNaN(id)){
                    res.status(400).json("l'id doit etre un nombre");
                } else {
                    await commentModele.deleteComment(client, id);
                    res.sendStatus(204)
                }
            } catch (error){
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (error){
        res.sendStatus(403);
    } finally {
        client.release();
    }
}