
import { getAllBooks } from '../API/book';
import { setBooks } from './bookSlice';
import { Alert } from 'react-native';
import { setReviews } from './reviewSlice';
import { getAllReviews } from '../API/reviews';
import { getAllUsers } from '../API/user';
import { setUsers } from './userSlice';

const fetchBookData = async (dispatch) => {
  try {
    const books = await getAllBooks();
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

const fetchReviewData = async (dispatch) => {
  try {
    const reviews = await getAllReviews();
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
      errorMessage = 'Erreur lors de la récupération des avis. Veuillez réessayer plus tard.';
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


export { fetchBookData, fetchReviewData, fetchUsersData };
      

