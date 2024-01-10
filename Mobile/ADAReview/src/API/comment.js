import axios from "axios";
import { IP } from "../constants/constants";
const commentURL = IP + "comment";
const versionNumber = '1.0.0';

const sendForm = async (formData, token) => { 
  try { 
    const response = await axios.post(commentURL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      });
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

const getComment = async (id, token) => {   
  try { 
    const response = await axios.get(`${commentURL}/${id}`, {
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

const getCommentsFromIdReview = async (id, token) => {
  try {    
    const response = await axios.get(`${commentURL}/all/${id}`, {
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

const deleteComment = async (id, token) => {    
    try {
      const response = await axios.delete(`${commentURL}/${id}`, {
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

const updateComment = async (id, formData, token) => {    
  try{
    return await axios.patch(`${commentURL}/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
    } catch (error) {
      console.error(error);
      throw error;
    }  
};

export {sendForm, getComment, getCommentsFromIdReview, deleteComment, updateComment};