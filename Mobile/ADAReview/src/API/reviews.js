import axios from "axios";
const reviewURL = "http://192.168.0.43:3001/review";
const versionNumber = "1.0.0";

const sendForm = async (formData) => {

    return await axios.post(reviewURL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Version': versionNumber
        }
      })
      .catch(error => {
        console.error(error);
      });
    
};


const getAllReviews = async (token) => {
    //return an array of review
    const response = await axios.get(reviewURL, {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    });
    return response.data;
};

const getReviewById = async (id) => {
    //return a review
    const response = await axios.get(`${reviewURL}/${id}`);
    return response.data;
}


const deleteReview = async (id) => {
    //return a review
    try {
      const response = await axios.delete(`${reviewURL}/${id}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
}

const updateReview = async (id, formData) => {
    //return a review
    return await axios.patch(`${reviewURL}/${id}`, formData, {
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
}

export {sendForm, getAllReviews, getReviewById, deleteReview, updateReview};