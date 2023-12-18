import axios from "axios";
const userURL = "http://localhost:3001/users";
const versionNumber = "1.0.0";

const sendForm = async (formData, token) => {

    console.log(formData);
    return await axios.post(userURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    

};


const getAllUsers = async (token) => {
    //return an array of users
    const response = await axios.get(userURL, 
      {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    });
    return response.data;
};

const getUserById = async (id, token) => {
    //return a user
    const response = await axios.get(`${userURL}/${id}`, 
    {
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Accept-Version': versionNumber
    }
  });
    return response.data;
}


const deleteUser = async (id, token) => {
    //delete a user
    return await axios.delete(`${userURL}/${id}`
    , {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    }).then(response => {
      console.log("response: ", response);
        return response;
      })
}

const updateUser = async (formData, token) => {
    //return a user
    return await axios.patch(userURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
}

const login = async (formData) => {

  return await axios.post(`${userURL}/login`, formData, {
      headers: {
          'Accept-Version': versionNumber
      }
  })
  .then(response => {
      const token = response.data.token;
      return response.data;
  })
  .catch(error => {
      console.error(error);
      return error;
  });
}

const logout = async (token) => {

  return await axios.get(`${userURL}/logout`, {
      headers: {
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
      }
  })
  .then(response => {
      console.log("response: ", response);
      return response;
  })
  .catch(error => {
      console.error(error);
      return error;
  });
}



export {sendForm, getAllUsers, getUserById, deleteUser, updateUser, login, logout};
