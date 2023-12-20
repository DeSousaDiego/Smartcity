const BookController = require("../controller/bookDB");
const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000, // 700Ko
        files : 1
    },
    storage: storage
});


/**
 * @swagger
 * /book:
 *  get:
 *      tags:
 *         - Book
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/BooksFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Aucun livre trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/', JWTMiddleWare.identification, BookController.getBooks);

/**
 * @swagger
 * /book/{id}:
 *  get:
 *      tags:
 *         - Livre
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: id
 *            description: ISBN d'un livre
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/BookFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Livre non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/:id', JWTMiddleWare.identification, BookController.getBookByID);


/**
 * @swagger
 * /book:
 *  post:
 *      tags:
 *          - Livre
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/BookToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/BookAdded'
 *          400: 
 *             description: |
 *              - Fichier image non valide
 *              - Formulaire non valide
 *              - Le JWT n'est pas valide
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, upload.fields([
    {name: 'isbn', maxCount: 1},
    {name: 'title', maxCount: 1},
    {name: 'author', maxCount: 1},
    {name: 'released_year', maxCount: 1},
    {name: 'genre', maxCount: 1},
    {name: 'country', maxCount: 1},
    {name: 'pages', maxCount: 1},
    {name: 'description', maxCount: 1},
    {name: 'illustrator', maxCount: 1},
    {name: 'publishing_house', maxCount: 1},
    {name : 'image', maxCount : 1}
]), BookController.createBook);


/**
 * @swagger
 * /book:
 *  post:
 *      tags:
 *          - Livre
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/BookToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/BookUpdated'
 *          400:
 *             description: |
 *              - Fichier image non valide
 *              - ISBN manquant
 *              - Formulaire non valide
 *              - Le JWT n'est pas valide
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,upload.fields([
    {name: 'isbn', maxCount: 1},
    {name: 'title', maxCount: 1},
    {name: 'author', maxCount: 1},
    {name: 'released_year', maxCount: 1},
    {name: 'genre', maxCount: 1},
    {name: 'country', maxCount: 1},
    {name: 'pages', maxCount: 1},
    {name: 'description', maxCount: 1},
    {name: 'illustrator', maxCount: 1},
    {name: 'publishing_house', maxCount: 1},
    {name : 'image', maxCount : 1}
]),BookController.updateBook);


/**
 * @swagger
 * /book:
 *  delete:
 *      tags:
 *          - Livre
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/BookDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/:id',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,BookController.deleteBook);

module.exports = router;