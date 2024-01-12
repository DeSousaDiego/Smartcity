import axios from "axios";
import { IP } from "../constants/constants";
const userURL = IP + "user";
const versionNumber = "1.0.0";

const sendForm = async (formData, token) => {
  try{
    return await axios.post(userURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
  } catch (error) {
      throw error;
  }
};


const getAllUsers = async (token) => {
  try{
    //return an array of users
    const response = await axios.get(userURL, 
      {
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

const getUserById = async (id, token) => {
  try{
      //return a user
      const response = await axios.get(`${userURL}/${id}`, 
      {
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
}


const deleteUser = async (id, token) => {
  try {
    //delete a user
    return await axios.delete(`${userURL}/${id}`, {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    })
  } catch (error) {
      console.error(error);
      throw error;
  }
}

const updateUser = async (formData, token) => {
  try {
    //return a user
    return await axios.patch(userURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
    } catch (error) {
      console.error(error);
      throw error;
    }
}

const login = async (formData) => {

  return await axios.post(`${userURL}/login`, formData, {
    headers: {
        'Accept-Version': versionNumber
    }
  })
  .then(response => {
      const token = response.data.token;
      return token;
  })
  .catch(error => {
      console.error(error);
      throw error;
  });
}

const logout = async (token) => {
  return await axios.post(`${userURL}/logout`, {}, {
    headers: {
        'Authorization': 'Bearer ' + token,
        'Accept-Version': versionNumber
    }
  })
  .then(response => {
      return response;
  })
  .catch(error => {
      console.error(error);
      throw error;
  });
}

const checkToken = async (token) => {
  return await axios.post(`${userURL}/checkToken`, {}, {
      headers: {
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
      }
  })
  .then(response => {
      return response;
  })
  .catch(error => {
      console.error(error);
      throw error;
  });
}



export {sendForm, getAllUsers, getUserById, deleteUser, updateUser, login, logout, checkToken};
