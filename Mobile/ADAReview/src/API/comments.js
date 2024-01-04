import axios from "axios";
const commentURL = "http://192.168.0.43:3001/comment";
const versionNumber = "1.0.0";

const sendForm = async (formData) => {  
    return await axios.post(commentURL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Version': versionNumber
        }
      })
      .catch(error => {
        console.error(error);
      });
  
};

const getComment = async () => {    
    const response = await axios.get(commentURL);
    return response.data;
};

const getCommentsFromIdReview = async (id) => {    
    const response = await axios.get(`${commentURL}/all/${id}`, {
        headers: {
          'Accept-Version': versionNumber
        }
      });
    return response.data;
};

const deleteComment = async (id) => {    
    try {
      const response = await axios.delete(`${commentURL}/${id}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updateComment = async (id, formData) => {    
    return await axios.patch(`${commentURL}/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
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