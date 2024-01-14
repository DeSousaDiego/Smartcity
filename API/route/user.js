const JWTMiddleWare = require("../middleware/IdentificationJWT");
const UserController = require('../controller/userDB');

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

router.get('/', JWTMiddleWare.identification, UserController.getAllUsers);
router.get('/:id', JWTMiddleWare.identification, UserController.getUserById);
router.get('/active/active', JWTMiddleWare.identification, UserController.getUser);

router.post('/', JWTMiddleWare.identification, upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'email_address', maxCount: 1},
    {name: 'password', maxCount: 1},
    {name: 'role', maxCount: 1, default: 'user'},
    {name: 'country', maxCount: 1},
    {name: 'phone_number', maxCount: 1},
    {name: 'news_letter', maxCount: 1},
    {name: 'image', maxCount: 1}
]) , UserController.createUser );

router.post('/register', upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'email_address', maxCount: 1},
    {name: 'password', maxCount: 1},
    {name: 'password2', maxCount: 1},
    {name: 'role', maxCount: 1, default: 'user'},
    {name: 'country', maxCount: 1},
    {name: 'phone_number', maxCount: 1},
    {name: 'news_letter', maxCount: 1},
    {name: 'image', maxCount: 1}
]) , UserController.createUser );

router.post('/login',upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'password', maxCount: 1}
]), UserController.login);


router.post('/checkToken', JWTMiddleWare.identification, UserController.checkToken);

router.post('/logout', JWTMiddleWare.identification, UserController.logout);

router.patch('/', JWTMiddleWare.identification, upload.fields([
    {name: 'id', maxCount: 1},
    {name: 'username', maxCount: 1},
    {name: 'email_address', maxCount: 1},
    {name: 'password', maxCount: 1},
    {name: 'role', maxCount: 1, default: 'user'},
    {name: 'country', maxCount: 1},
    {name: 'phone_number', maxCount: 1},
    {name: 'news_letter', maxCount: 1},
    {name: 'image', maxCount: 1}
]), UserController.updateUser);

router.delete('/:id', JWTMiddleWare.identification, UserController.deleteUser);

module.exports = router;
