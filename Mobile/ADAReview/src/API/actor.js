import axios from "axios";
import { IP } from "../constants/constants";
const actorURL = IP + "actor";
const versionNumber = "1.0.0";


const getAllActors = async (token) => {
    try{
    const response = await axios.get(actorURL, {
        headers: {
            'Authorization' : 'Bearer ' + token,
            'Accept-Version': versionNumber
        }
    });
    return response.data;
}
catch(error){
    throw error;
}
};
export {getAllActors}