import axios from "axios";
const reviewURL = "http://localhost:3001/review";
const versionNumber = "1.0.0";

const sendForm = async (formData, token) => {

    try{
      return await axios.post(reviewURL, formData, {
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


const getAllReviews = async (token) => {
  try {
    //return an array of review
    const response = await axios.get(reviewURL, {
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

const getReviewById = async (id, token) => {
  try {
    //return a review
    const response = await axios.get(`${reviewURL}/${id}`,{
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const deleteReview = async (id, token) => {
  //return a review
  try {
    const response = await axios.delete(`${reviewURL}/${id}`, {
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

const updateReview = async (id, formData, token) => {
  try {
    //return a review
    return await axios.patch(`${reviewURL}/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export {sendForm, getAllReviews, getReviewById, deleteReview, updateReview};