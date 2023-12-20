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
    return response.data;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const getAllBooks = async (token) => {
  try{
    const response = await axios.get(bookURL, {
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Accept-Version': versionNumber
    }
  });
  return response.data;
  } 
  catch (error) {
    console.error(error);
    throw error;
  }
};


const getBookById = async (id, token) => {
  try{
  const response = await axios.get(`${bookURL}/${id}`,{
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Accept-Version': versionNumber
    }
  }
  );
  return response.data;
  }
  catch(error){
    console.error(error);
    throw error;
  }
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

  } catch (error) {
      console.error(error);
      throw error;
  }
};

const updateBook = async (formData,token) => {
  try{

    return await axios.patch(bookURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
          'Accept-Version': versionNumber
        }
      })
  }
  catch(error){ 
    console.error(error);
    throw error;
  }
}
export{getAllBooks, updateBook, deleteBook, getBookById, sendForm}