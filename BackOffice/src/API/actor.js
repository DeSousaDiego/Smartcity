import axios from "axios";
const actorURL = "http://localhost:3001/actors";
const versionNumber = "1.0.0";


const getAllActors = async (token) => {

    const response = await axios.get(actorURL, {
        headers: {
            'Authorization' : 'Bearer ' + token,
            'Accept-Version': versionNumber
        }
    });
    return response.data;
};
export {getAllActors}