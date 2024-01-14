const pool = require('../model/database');
const actorModel = require('../model/actorDB');

module.exports.getAllActors = async(req, res) => {
    const client = await pool.connect();
    try{
        const {rows : actors } = await actorModel.getAllActors(client);
        res.json(actors);
    }
    catch(error){
        res.sendStatus(500);
    }
    finally{
        client.release();
    }
}