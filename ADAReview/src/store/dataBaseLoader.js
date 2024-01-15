import { getAllBooks } from '../API/book';
import { setBooks } from './bookSlice';
import { Alert } from 'react-native';
import { setReviews } from './reviewSlice';
import { getAllReviews } from '../API/review';
import { getAllUsers } from '../API/user';
import { getCommentsFromIdReview } from '../API/comment';
import { setComments } from './commentSlice';
import { setUsers } from './userSlice';
import { errorHandling } from '../error/errorHandling';

let errorMsg = "";

const fetchBookData = async (dispatch, token) => {
  try {
    const books = await getAllBooks(token);
    dispatch(setBooks(books));
  } catch (error) {
    errorMsg = errorHandling(error);
    Alert.alert(errorMsg);
  }
};

const fetchReviewData = async (dispatch, token) => {
  try {
    const reviews = await getAllReviews(token);
    dispatch(setReviews(reviews));
  } catch (error) {
    errorMsg = errorHandling(error);
    Alert.alert(errorMsg);
  }
};

const fetchUsersData = async (dispatch, token) => {
  try {
    const users = await getAllUsers(token);
    dispatch(setUsers(users));
  } catch (error) {
    errorMsg = errorHandling(error);
    Alert.alert(errorMsg);
  };
};

  const fetchCommentsData = async (dispatch, id, token) => {
    try {
      const comments = await getCommentsFromIdReview(id, token);
      dispatch(setComments(comments));
    } catch (error) {
      errorMsg = errorHandling(error);
      Alert.alert(errorMsg);
    }
  };



export { fetchBookData, fetchReviewData, fetchUsersData, fetchCommentsData };
      

