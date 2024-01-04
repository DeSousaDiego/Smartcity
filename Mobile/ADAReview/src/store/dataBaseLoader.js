import { getAllBooks } from '../API/book';
import { setBooks } from './bookSlice';
import { Alert } from 'react-native';
import { setReviews } from './reviewSlice';
import { getAllReviews } from '../API/reviews';
import { getAllUsers } from '../API/user';
import { getCommentsFromIdReview } from '../API/comments';
import { setComments } from './commentSlice';
import { setUsers } from './userSlice';


const fetchBookData = async (dispatch, token) => {
  try {
    const books = await getAllBooks(token);
    dispatch(setBooks(books));
  } catch (error) {
    let errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.';

    if (error.response) {
      // Gérer l'erreur de réponse du serveur
      errorMessage = 'Erreur lors de la récupération des livres. Veuillez réessayer plus tard.';
    } else if (error.request) {
      // Gérer l'erreur de non-réception de réponse
      errorMessage = 'Aucune réponse reçue du serveur. Veuillez vérifier vos paramètres réseau.';
    }
    

    // Dispatch an action to update the Redux state with the error message if needed
    // dispatch(setError(errorMessage));

    // Display a simple alert with the error message
    Alert.alert(errorMessage);
  }
};

const fetchReviewData = async (dispatch, token) => {
  try {
    const reviews = await getAllReviews(token);
    dispatch(setReviews(reviews));
  } catch (error) {
    let errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.';

    if (error.response) {
      // Gérer l'erreur de réponse du serveur
      errorMessage = 'Erreur lors de la récupération des critiques. Veuillez réessayer plus tard.';
    } else if (error.request) {
      // Gérer l'erreur de non-réception de réponse
      errorMessage = 'Aucune réponse reçue du serveur. Veuillez vérifier vos paramètres réseau.';
    }
    
    // Dispatch an action to update the Redux state with the error message if needed
    // dispatch(setError(errorMessage));

    // Display a simple alert with the error message
    Alert.alert(errorMessage);
  }
};

const fetchUsersData = async (dispatch) => {
  try {
    const users = await getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    let errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.';

    if (error.response) {
      // Gérer l'erreur de réponse du serveur
      errorMessage = 'Erreur lors de la récupération des utilisateur. Veuillez réessayer plus tard.';
    } else if (error.request) {
      // Gérer l'erreur de non-réception de réponse
      errorMessage = 'Aucune réponse reçue du serveur. Veuillez vérifier vos paramètres réseau.';
    }    

    // Dispatch an action to update the Redux state with the error message if needed
    // dispatch(setError(errorMessage));

    // Display a simple alert with the error message
    Alert.alert(errorMessage);
  };
};

  const fetchCommentsData = async (dispatch, id) => {
    try {
      const comments = await getCommentsFromIdReview(id);
      dispatch(setComments(comments));
    } catch (error) {
      let errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.';
  
      if (error.response) {
        // Gérer l'erreur de réponse du serveur
        errorMessage = 'Erreur lors de la récupération des commentaires. Veuillez réessayer plus tard.';
      } else if (error.request) {
        // Gérer l'erreur de non-réception de réponse
        errorMessage = 'Aucune réponse reçue du serveur. Veuillez vérifier vos paramètres réseau.';
      }    
  
      // Dispatch an action to update the Redux state with the error message if needed
      // dispatch(setError(errorMessage));
  
      // Display a simple alert with the error message
      Alert.alert(errorMessage);
    }
  };



export { fetchBookData, fetchReviewData, fetchUsersData, fetchCommentsData };
      

