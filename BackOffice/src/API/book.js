import axios from "axios";
const bookURL = "http://localhost:3001/book";
const versionNumber = "1.0.0";

const sendForm = async (formData,token) => {

  try {
    const response = await axios.post(bookURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    });

    // Retourne la réponse si nécessaire
    return response.data;
  } catch (error) {
    // Rejette la promesse avec l'erreur
    throw error;
  }
};



const getAllBooks = async (token) => {

    const response = await axios.get(bookURL, {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Accept-Version': versionNumber
      }
    });
    return response.data;
};


const getBookById = async (id, token) => {
  console.log("id: ", id);
  console.log("token: ", token);
  const response = await axios.get(`${bookURL}/${id}`,{
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Accept-Version': versionNumber
    }
  }
  );
  console.log("${userURL}/${id}", `${bookURL}/${id}`);
  console.log("response: ", response);
  return response.data;
}
const deleteBook = async (id,token) => {

    try {
      const response = await axios.delete(`${bookURL}/${id}`, {
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

const updateBook = async (formData,token) => {

    return await axios.patch(bookURL, formData, {
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
export{getAllBooks, updateBook, deleteBook, getBookById, sendForm}
