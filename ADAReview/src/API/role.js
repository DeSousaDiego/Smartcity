import axios from "axios";
import { IP } from "../constants/constants";
const rolesURL = IP + "role";
const versionNumber = "1.0.0";


const getAllRoles = async (token) => {
    try {
        //return an array of users
        const response = await axios.get(rolesURL, {
            headers: {
                'Authorization' : 'Bearer ' + token,
                'Accept-Version': versionNumber
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {getAllRoles}