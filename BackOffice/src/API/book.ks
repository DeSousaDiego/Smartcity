import axios from "axios";
const bookURL = "http://localhost:3001/books";

const sendForm = async (formData) => {

  try {
    const response = await axios.post(bookURL, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Retourne la réponse si nécessaire
    return response.data;
  } catch (error) {
    // Rejette la promesse avec l'erreur
    throw error;
  }
};



const getAllBooks = async () => {

    const response = await axios.get(bookURL);
    return response.data;
};


const getBookById = async (id) => {

  const response = await axios.get(`${bookURL}/${id}`);
  console.log("${userURL}/${id}", `${bookURL}/${id}`);
  console.log("response: ", response);
  return response.data;
}
const deleteBook = async (id) => {

    try {
      const response = await axios.delete(`${bookURL}/${id}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updateBook = async (formData) => {

    return await axios.patch(bookURL, formData, {
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
export{getAllBooks, updateBook, deleteBook, getBookById, sendForm}