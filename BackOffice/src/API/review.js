import axios from "axios";
const reviewURL = "http://localhost:3001/reviews";

const sendForm = async (formData, token) => {

    return await axios.post(reviewURL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    

};


const getAllReviews = async (token) => {
    //return an array of review
    const response = await axios.get(reviewURL, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    });
    console.log("response.data: ", response.data);
    return response.data;
};

const getReviewById = async (id, token) => {
    //return a review
    const response = await axios.get(`${reviewURL}/${id}`,{
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    }
    );
    return response.data;
}


const deleteReview = async (id, token) => {
    //return a review
    try {
      const response = await axios.delete(`${reviewURL}/${id}`, {
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      });
      return response.data;
  } catch (err) {
      console.error(err);
  }
}

const updateReview = async (id, formData, token) => {
    //return a review
    return await axios.patch(`${reviewURL}/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
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