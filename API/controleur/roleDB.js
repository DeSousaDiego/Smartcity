const pool = require('../modele/database');
const roleModele = require('../modele/roleDB');
module.exports.getRoles = async (req,res) =>{
    const client = await pool.connect();
    try{
        const {rows : roles} = await roleModele.getRoles(client);
        res.json(roles);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    finally{
        client.release();
    }
}