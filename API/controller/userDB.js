require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const hash = require('../utils/utils');

const pool = require('../model/database');
const UserModel = require('../model/userDB');
const {userSchema, userUpdateScheme} = require('../schema/ValidationSchemas');
const {saveImage} = require('../model/imageManager');
const uuid = require('uuid');
const fs = require('fs');
const destFolderImages = "./upload/avatars";

module.exports.login = async (req, res) => {
    const {username, password} = req.body;

    if(username === undefined || password === undefined){
        res.send(400).json("Missing username or password");
    } else {
        const client = await pool.connect();
        try {
            const result = (await UserModel.login(client, username));
            const user = result.rows[0];

            if(user !== undefined && await hash.compareHash(password, user.password)){
                const {id, role} = user;
                if (role !== "admin" && role !== "user") {
                    res.sendStatus(404);
                } else {
                    const payload = {status: role, value: {id}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'}
                    );
                    req.session = {id, role};
                    res.json({token});
                }
            }
            else{
                res.sendStatus(404);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.checkToken = async (req, res) => {
    if(req.session){
        const userObj = req.session;
        if(userObj.authLevel === "admin"){
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }

}

module.exports.logout = async (req, res) => {
    if(req.session){
        req.session = null;
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

module.exports.updateUser = async (req, res) => {
    if(req.session){
        const client = await pool.connect();
        const toUpdate = req.body;
        const newData = {};
        const userObj = req.session;
        const image = req.files?.image || null;
        let imageName = null;
        const {rows: users} = await UserModel.getUserById(client, toUpdate.id);
        console.log("users", users);
        const user = users[0];
        console.log("user", user);
        let doUpdate = false;
        let imageError = false
        newData.id = toUpdate.id;
        // if the user is a simple user and the id is not his id, he can't update another user
        if(userObj.id !== toUpdate.id && userObj.authLevel !== "admin"){
            res.sendStatus(401);
        }
        else{
            // if the user is a simple user, he can't update the role
            if(userObj.authLevel !== "admin"){
                toUpdate.role = user.role;
            }

            if (image) {
                // Vérifier si le fichier est une image valide
                const  fileType = image[0].mimetype;
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
                imageError = !validImageTypes.includes(fileType);
                imageName = uuid.v4();
            }
            if(!imageError){
                if(
                    toUpdate.username !== undefined ||
                    toUpdate.email_address !== undefined ||
                    toUpdate.password !== undefined ||
                    toUpdate.password2 !== undefined ||
                    toUpdate.role !== undefined ||
                    toUpdate.country !== undefined ||
                    toUpdate.phone_number !== undefined ||
                    toUpdate.news_letter !== undefined
                ){
                    doUpdate = true;
                }

                if(doUpdate){
                    newData.username = toUpdate.username;
                    newData.email_address = toUpdate.email_address;
                    newData.password = toUpdate.password;
                    newData.password2 = toUpdate.password2;
                    newData.role = toUpdate.role;
                    newData.country = toUpdate.country;
                    newData.phone_number = toUpdate.phone_number;
                    newData.news_letter = toUpdate.news_letter;
                    newData.image = imageName;                
                    try{
                            const results = userUpdateScheme.safeParse({
                                username: newData.username,
                                email_address: newData.email_address,
                                password: newData.password,
                                password2: newData.password2,
                                role: newData.role,
                                country: newData.country,
                                phone_number: newData.phone_number,
                                news_letter: (newData.news_letter === "true"),
                                image: imageName
                            });

                            if (image) {
                                await saveImage(image[0].buffer, imageName, destFolderImages);
                            }
                
                            if (!results.success) {
                                res.status(400).json("Erreur lors de la mise à jour des données");
                            } else {
                                const newUser = results.data;
                
                                await UserModel.updateUser(
                                    client,
                                    toUpdate.id,
                                    newUser.username,
                                    newUser.email_address,
                                    newUser.password,
                                    newUser.role,
                                    newUser.country,
                                    newUser.phone_number,
                                    newUser.news_letter,
                                    imageName,
                                );
                                let fileNameToDelete = null;
                                let filePath = null;
                                console.log("toUpdate", toUpdate);
                                console.log("users", users);
                                

                                if(user.profile_picture_path){
                                    fileNameToDelete = user.profile_picture_path
                                    filePath = `${destFolderImages}/${fileNameToDelete}.jpeg`;
                                    // Vérifier si le fichier existe avant de le supprimer
                                    if (fs.existsSync(filePath)) {
                                        // Supprimer le fichier
                                        fs.unlinkSync(filePath);
                                    }
                                }
                            res.sendStatus(204);
                            }
                        }
                        catch (error) {
                            console.error(error);
                            res.sendStatus(500);
                        } finally {
                            client.release();
                        }
                    
                
                }
                else{
                res.sendStatus(400);
                }
            } else{
                res.status(400).json("Le fichier n'est pas une image valide.");
            }
        }
        

    } else {
        res.sendStatus(401);
    }
}

module.exports.getUserById = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if(isNaN(id)){
            res.status(400).json("L'id doit être un nombre");
        } else {
            const {rows: users} = await UserModel.getUserById(client, id);
            if(users.length > 0){
                const user = users[0];
                res.json(user);
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


module.exports.getUser = async (req, res) => {
    if(req.session){
        const userObj = req.session;
        const client = await pool.connect();
        try{
            const {rows: users} = await UserModel.getUser(client, userObj.id);
            const user = users[0];
            if(user !== undefined){
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}


module.exports.createUser = async (req, res) => {
    const client = await pool.connect();
    const newData = req.body;
    const image = req.files?.image || null;
    const userObj = req.session;
    let imageName = null;
    let imageError = false;

    if (image) {
        // Vérifier si le fichier est une image valide
        const  fileType = image[0].mimetype;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
        imageError = !validImageTypes.includes(fileType);
        imageName = uuid.v4();
    }
    
    if(!imageError){

        if (userObj.role !== "admin") {
            newData.role = "user";
        }
        try{
            const result = userSchema.safeParse({
                username: newData.username,
                password: newData.password,
                password2: newData.password2,
                email_address: newData.email_address,
                role: newData.role,
                country: newData.country,
                phone_number: newData.phone_number,
                news_letter: (newData.news_letter === "true"),
                image: imageName
            });

            if(!result.success){
                res.status(400).json(result.error);
            }
            else{
                if (image) {
                    await saveImage(image[0].buffer, imageName, destFolderImages);
                }
                const newUser = result.data;
                await UserModel.createUser(
                    client,
                    newUser.username,
                    newUser.password,
                    newUser.email_address,
                    newUser.role,
                    newUser.country,
                    newUser.phone_number,
                    newUser.news_letter,
                    imageName
                );
                res.sendStatus(201);
            }

        }
        catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.status(400).json("Le fichier n\'est pas une image valide.");
    }
}


module.exports.deleteUser = async (req, res) => {
    if(req.session){
        const client = await pool.connect();
        const idText = req.params.id;
        const id = parseInt(idText);
        const userObj = req.session;
    
        // if the user is a simple user, he can't delete another user
        if(userObj.id !== id && userObj.authLevel !== "admin"){
            res.sendStatus(401);
        }
        else{
            try{
                if(isNaN(id)){
                    res.status(400).json("L'id doit être un nombre");
                } else {
                    await UserModel.deleteUser(client, id);
                    res.sendStatus(204);
                }
            } catch (error){
                console.error(error);
                res.sendStatus(500);
            } finally {
                client.release();
            }
        }
    }
}

module.exports.getAllUsers = async (req, res) => {
    const client = await pool.connect();
    try{
        const {rows: users} = await UserModel.getAllUsers(client);
        if(users.length > 0){
            // display all users
            res.json(users);
        } else {
            res.sendStatus(404);
        }    }
    catch (error) {
        console.error('Error in getAllUsers:', error.message);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
