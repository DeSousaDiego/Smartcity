import axios from "axios";
const actorURL = "http://192.168.0.43:3001/actor";


const getAllActors = async (token) => {

    const response = await axios.get(actorURL, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });
    return response.data;
};
export {getAllActors}