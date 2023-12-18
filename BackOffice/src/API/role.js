import axios from "axios";
const rolesURL = "http://localhost:3001/roles";
const versionNumber = "1.0.0";


const getAllRoles = async (token) => {
    //return an array of users
    const response = await axios.get(rolesURL, {
        headers: {
            'Authorization' : 'Bearer ' + token,
            'Accept-Version': versionNumber
        }
    });
    return response.data;
};

export {getAllRoles}