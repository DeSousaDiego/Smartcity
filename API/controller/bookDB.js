const pool = require('../model/database.js');
const bookModel = require('../model/bookDB.js');
const roleModel = require('../model/roleDB.js');
const actorModel = require('../model/actorDB.js');
const reviewModel = require('../model/reviewDB.js');
const {bookSchema} = require('../schema/ValidationSchemas.js');
const {saveImage} = require('../model/imageManager.js');
const uuid = require('uuid');
const fs = require('fs');
const destFolderImages = "./upload/images";

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         isbn:
 *           type: string
 *           description: ISBN du livre.
 *         title:
 *           type: string
 *           description: Titre du livre.
 *         author:
 *           type: string
 *           description: Auteur du livre.
 *         illustrator:
 *           type: string
 *           description: Illustrateur du livre.
 *         description:
 *           type: string
 *           description: Description du livre.
 *         genre:
 *           type: string
 *           description: Genre du livre.
 *         released_year:
 *           type: integer
 *           format: int32
 *           description: Année de publication du livre.
 *         country:
 *           type: string
 *           description: Pays où le livre a été initialement publié.
 *         publishing_house:
 *           type: string
 *           description: Éditeur du livre.
 *         img_path:
 *           type: string
 *           description: Chemin vers l'image du livre.
 *         rating:
 *           type: number
 *           format: float
 *           description: Note moyenne du livre.
 *         nb_ratings:
 *           type: integer
 *           format: int32
 *           description: Nombre de notations du livre.
 * 
 *     BooksList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Book'
 * 
 *     BookInput:
 *       type: object
 *       properties:
 *         isbn:
 *           type: string
 *           description: ISBN du livre.
 *         title:
 *           type: string
 *           description: Titre du livre.
 *         description:
 *           type: string
 *           description: Description du livre.
 *         country:
 *           type: string
 *           description: Pays d'origine du livre.
 *         genre:
 *           type: string
 *           description: Genre du livre.
 *         released_year:
 *           type: integer
 *           format: int32
 *           description: Année de publication du livre.
 *         pages:
 *           type: integer
 *           format: int32
 *           description: Nombre de pages du livre.
 *         publishing_house:
 *           type: string
 *           description: Maison d'édition du livre.
 *         illustrator:
 *           type: string
 *           description: Illustrateur du livre (peut être vide).
 *         author:
 *           type: string
 *           description: Auteur du livre (peut être vide).
 *         image:
 *           type: binary
 *           description: Fichier image du livre (utiliser le format `multipart/form-data` lors de l'envoi de la requête).
 */


/**
 * @swagger
 * components:
 *  responses:
 *      BookFound:
 *         description : renvoie un livre
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/Book'
 * 
 * 
 */
module.exports.getBookByID = async (req, res) => {
    if(req.session !== undefined){
        const bookISBN = req.params.id;
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
    
            const {rows} = await bookModel.getBookByID(bookISBN, client);
            if (rows.length > 0) {
                const book = rows[0];
                nbRatings = 0;
                sumRatings = 0;
                book.rating = 0;

                // Calcul de la note du livre sur base des notes des review
                const {rows : reviews} = await reviewModel.getBookRatings(book.isbn, client);
                if(reviews.length > 0){

                    for(let review of reviews){
                        nbRatings += 1;
                        sumRatings += review.rating;
                    }
                    book.rating = Math.round((sumRatings / nbRatings) * 10) / 10;
                    book.nbRatings = nbRatings;
                }

                const { rows: roles } = await roleModel.getRolesByBookID(book.isbn, client);
                book.author = "";
                book.illustrator = "";
                for (let role of roles) {
                    if(role.role_name === "author"){
                        book.author = role.actor_name;
                    }
                    if(role.role_name === "illustrator"){
                        book.illustrator = role.actor_name;
                    }
                }

                await client.query('COMMIT');
                res.json(book);
            } 
            else {
                await client.query('ROLLBACK');
                res.sendStatus(404)
            }
        } 
        catch (error) {
            await client.query('ROLLBACK');
            console.error("error: ", error);
            res.sendStatus(500);
        } 
        finally {
            client.release();
        }
    }
    else{
        res.sendStatus(401);
    }
}


/**
 * @swagger
 * components:
 *  responses:
 *      BooksFound:
 *         description : renvoie une liste contenant tous les livres
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/BooksList'
 * 
 * 
 */
module.exports.getBooks = async (req, res) => {
    if(req.session !== undefined){
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
    
            const { rows: books } = await bookModel.getBooks(client);
            if (books.length > 0) {
                for (const book of books) {
                    nbRatings = 0;
                    sumRatings = 0;
                    book.rating = 0;
                    // Calcul de la note du livre sur base des notes des review
                    const {rows : reviews} = await reviewModel.getBookRatings(book.isbn, client);
                    if(reviews.length > 0){

                        for(review of reviews){
                            nbRatings += 1;
                            sumRatings += review.rating;
                        }
                        book.rating = Math.round((sumRatings / nbRatings) * 10) / 10;
                        book.nbRatings = nbRatings;
                    }

                    const { rows: roles } = await roleModel.getRolesByBookID(book.isbn, client);
                    for (const role of roles) {
                        if(role.role_name === "author"){
                            book.author = role.actor_name;
                        }
                        if(role.role_name === "illustrator"){
                            book.illustrator = role.actor_name;
                        }
                    }
                    
                }
    
                await client.query('COMMIT');
                res.json(books);
            } 
            else {
                await client.query('ROLLBACK');
                res.sendStatus(404);
            }
        } 
        catch (error) {
            await client.query('ROLLBACK');
            console.error("error: ", error);
            res.sendStatus(500);
        } 
        finally {
            client.release();
        }
    }
    else{
        res.sendStatus(401);
    }
}


/**
 *@swagger
 *components:
 *  responses:
 *      BookAdded:
 *          description: le livre a été ajouté
 *  requestBodies:
 *      BookToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BookInput'
 */
module.exports.createBook = async (req, res) => {
    const toInsert = req.body;
    const image = req.files?.image || null;
    let imageName = null;
    let imageError = false;
    // Image facultative donc vérifier si elle existe
    if (image) {
        // Vérifier si le fichier est une image valide
        const  fileType = image[0].mimetype;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!validImageTypes.includes(fileType)) {
            imageError = true;
        }
        imageName = uuid.v4();
    }
    if(!imageError){
        try {
            // Valider les champs du formulaire
            const newData = bookSchema.parse({
                isbn: toInsert.isbn,
                title: toInsert.title,
                description: toInsert.description,
                country: toInsert.country,
                genre: toInsert.genre,
                releasedYear: toInsert.released_year,
                pages: parseInt(toInsert.pages),
                publishingHouse: toInsert.publishing_house,
                illustrator: toInsert.illustrator === "" ? null : toInsert.illustrator,
                imgPath: imageName,
                author: toInsert.author === "" ? null : toInsert.author,
            });

            //Transformer l'année en int pour l'insérer dans la BD
            newData.releasedYear = parseInt(newData.releasedYear);

            // Créer un tableau d'acteurs
            const actors = [{ type: "author", name:newData.author }, { type: "illustrator", name: newData.illustrator}];
            const client = await pool.connect();
            try {
                await client.query('BEGIN;');
                // Insérer le livre dans la base de données
                await bookModel.insertBook(
                    newData.isbn,
                    newData.title,
                    newData.description,
                    newData.country,
                    newData.genre,
                    newData.releasedYear,
                    newData.pages,
                    newData.publishingHouse,
                    newData.imgPath,
                    client
                );
                if (image){
                    await saveImage(image[0].buffer, imageName, destFolderImages);
                }

                // Traiter les acteurs et les rôles
                for (let actor of actors) {
                    if (actor.name != null) {
                        // Vérifier si l'acteur existe dans la base de données
                        const { rows: actorRows } = await actorModel.getActor(actor.name, client);
                        // Insérer l'acteur dans la base de données s'il n'existe pas
                        let actorID = actorRows.length > 0 ? actorRows[0].id : await actorModel.insertActor(actor.name, client);
                        // Insérer le rôle dans la base de données
                        await roleModel.insertRole(newData.isbn, actorID, actor.type, client);
                    }
                }

                await client.query("COMMIT");
                res.sendStatus(201);
            } catch (error) {
                await client.query('ROLLBACK');
                res.sendStatus(500);
            } finally {
                client.release();
            }

        } catch (error) {
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
    } else{
        res.status(400).json("Le fichier n'est pas une image valide.");
    }
};


/**
 *@swagger
 *components:
 *  responses:
 *      BookUpdated:
 *          description: le livre a été modifié
 *  requestBodies:
 *      BookToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BookInput'
 */
module.exports.updateBook = async (req, res) => {
    const toUpdate = req.body;
    const bookISBN = toUpdate.isbn;
    const image = req.files?.image || null;
    let imageName = null;
    let imageError = false;
    if(bookISBN !== undefined){

        if (image) {
            // Vérifier si le fichier est une image valide
            const  fileType = image[0].mimetype;
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
            if (!validImageTypes.includes(fileType)) {
                imageError = true;
            }
            imageName = uuid.v4();
        }
        if(!imageError){

            try {
                // Validate the request body against the Zod schema
                const updatedData = bookSchema.parse({
                    isbn: bookISBN,
                    title: toUpdate.title,
                    description: toUpdate.description,
                    country: toUpdate.country,
                    genre: toUpdate.genre,
                    releasedYear: toUpdate.released_year,
                    pages: parseInt(toUpdate.pages),
                    publishingHouse: toUpdate.publishing_house,
                    illustrator: toUpdate.illustrator === "" ? null : toUpdate.illustrator,
                    imgPath: imageName,
                    author: toUpdate.author,
                });

                updatedData.releasedYear = parseInt(updatedData.releasedYear);

                // Create an array of actors
                const actors = [{ type: "author", name: updatedData.author }, { type: "illustrator", name: updatedData.illustrator }];
                const client = await pool.connect();

                try {
                    //Supprimer l'image du folder upload
                    const {rows} = await bookModel.getBookByID(bookISBN, client);
                    if(rows[0].img_path){
                        const fileNameToDelete = rows[0].img_path
                        const filePath = `${destFolderImages}/${fileNameToDelete}.jpeg`;
                        
                        // Vérifier si le fichier existe avant de le supprimer
                        if (fs.existsSync(filePath)) {
                            // Supprimer le fichier
                            fs.unlinkSync(filePath);
                        }
                    }
                    await client.query('BEGIN;');
                    // Update the book in the DB
                    await bookModel.updateBook(
                        bookISBN,
                        updatedData.title,
                        updatedData.description,
                        updatedData.country,
                        updatedData.genre,
                        updatedData.releasedYear,
                        updatedData.pages,
                        updatedData.publishingHouse,
                        updatedData.imgPath,
                        client
                    );
                    if (image) {
                        await saveImage(image[0].buffer, imageName, destFolderImages);
                    }
                    // Delete roles linked to the book in the DB
                    await roleModel.deleteRole(bookISBN, client);

                    // Reassign roles based on the new data
                    for (let actor of actors) {
                        if (actor.name != null) {
                            // Check if the actor exists in the DB
                            const { rows: actorRows } = await actorModel.getActor(actor.name, client);

                            // Insert the actor into the DB if not exists + get the ID
                            const actorID = actorRows.length > 0 ? actorRows[0].id : await actorModel.insertActor(actor.name, client);

                            // Insert the role into the DB
                            await roleModel.insertRole(bookISBN, actorID, actor.type, client);
                        }
                    }

                    await client.query("COMMIT");
                    // Save the new image only if the book update is successful and an image is provided
                    res.sendStatus(204);

                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error(error);
                    res.sendStatus(500);
                } finally {
                    client.release();
                }
            } catch (error) {
                // Handle validation errors
                console.error(error.errors);
                res.status(400).json("La validation du formulaire a échoué");
            }
        }else{
            res.status(400).json("Le fichier n'est pas une image valide.");
        }
    } else{
        res.status(400).json("L'ISBN du livre est manquant");
    }
};


/**
 *@swagger
 *components:
 *  responses:
 *      BookDeleted:
 *          description: Le livre a été supprimé
 */
module.exports.deleteBook = async (req,res) =>{
    const bookISBN = req.params.id;
    if(bookISBN != undefined){
        const client = await pool.connect();
        try{
            //Supprimer l'image du folder upload
            let fileNameToDelete = null;
            let filePath = null;
            const {rows} = await bookModel.getBookByID(bookISBN, client);
            if(rows[0].img_path){
                fileNameToDelete = rows[0].img_path
                filePath = `${destFolderImages}/${fileNameToDelete}.jpeg`;
                // Vérifier si le fichier existe avant de le supprimer
                if (fs.existsSync(filePath)) {
                    // Supprimer le fichier
                    fs.unlinkSync(filePath);
                }
            }
            await client.query("BEGIN;");
            //Supprimer les roles liés au livre
            await roleModel.deleteRole(bookISBN,client);
            // Supprimer les reviews liées au livre
            
            const {rows: reviewIds} = await reviewModel.getReviewsId(bookISBN, client);
            if(reviewIds.length > 0){
                await reviewModel.deleteBookReviews(bookISBN, reviewIds, client);
            }
            //Supprimer le livre
            await bookModel.deleteBook(bookISBN, client);
            await client.query("COMMIT");
            res.sendStatus(204);
        }
        catch(error){
            await client.query("ROLLBACK");
            res.sendStatus(500);
        }
        finally{
            client.release();
        }
    }
    else{
        res.status(400).json("L'ISBN du livre est manquant");
    }
}
