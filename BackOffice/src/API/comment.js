import axios from "axios";
const commentURL = "http://localhost:3001/comment";
const versionNumber = '1.0.0';

const sendForm = async (formData, token) => {  
    return await axios.post(commentURL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
      .then(response => {
        console.log("response: ", response);
      })
      .catch(error => {
        console.error(error);
      });
    

};

const getComment = async (token) => {    
    const response = await axios.get(commentURL, {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    });
    return response.data;
};

const getCommentsFromIdReview = async (id, token) => {    
    const response = await axios.get(`${commentURL}/all/${id}`, {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    });
    return response.data;
};

const deleteComment = async (id, token) => {    
    try {
      const response = await axios.delete(`${commentURL}/${id}`, {
        headers: {
          'Authorization' : 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updateComment = async (id, formData, token) => {    
    return await axios.patch(`${commentURL}/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
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

export {sendForm, getComment, getCommentsFromIdReview, deleteComment, updateComment};
