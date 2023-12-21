import { getAllUsers } from '../API/user';
import { getAllBooks } from '../API/book';
import { getAllReviews } from '../API/review';
import { getCommentsFromIdReview } from '../API/comment';
import { getAllRoles } from '../API/role';
import { getAllActors } from '../API/actor';
import { setBooks } from './slice/bookSlice';
import { setReviews } from './slice/reviewSlice';
import { setComments, clearComments } from './slice/commentSlice';
import { setUsers } from './slice/userSlice';
import { setRoles } from './slice/roleSlice';
import { setActors } from './slice/actorSlice';
import { errorHandling } from '../error/errorHandling';

let errorMsg = "";
const loadBookData = async(dispatch, token) =>{
    try {
        const bookDataRows = [];
        const books = await getAllBooks(token);
        books.forEach(book => {
            bookDataRows.push([
                {type: 'text', content: book.isbn},
                {type: 'text', content: book.title},
                {type: 'text', content: book.author},
                {type: 'text', content: book.illustrator ? book.illustrator : 'none'},
                {type: 'text', content: book.rating},
                {type: 'text', content: book.description},
                {type: 'text', content: book.country},
                {type: 'text', content: book.genre},
                {type: 'text', content: book.released_year},
                {type: 'text', content: book.pages},
                {type: 'text', content: book.publishing_house},
                {type: 'image', content: book.img_path ? book.img_path : 'none'},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        dispatch(setBooks(bookDataRows));
    } catch (error) {
        errorMsg = errorHandling(error);
        alert(errorMsg);
    }
};

const loadUserData = async (dispatch, token) => {
    try {
        const userDataRows = [];
        const users = await getAllUsers(token);
        users.forEach(user => {
            userDataRows.push([
                {type: 'text', content: user.id},
                {type: 'text', content: user.username},
                {type: 'text', content: user.email_address},
                {type: 'text', content: user.role},
                {type: 'text', content: user.country},
                {type: 'text', content: user.phone_number},
                {type: 'boolean', content: user.news_letter},
                {type: 'image', content: user.img_path ? user.img_path : 'none'},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        dispatch(setUsers(userDataRows));
    } catch (error) {
        errorMsg = errorHandling(error);
        alert(errorMsg);
    }
};

const loadReviewData = async(dispatch, token) =>{
    try {
        const reviewDataRows = [];
        const reviews = await getAllReviews(token);
        reviews.forEach(review => {
            reviewDataRows.push([
                {type: 'text', content: review.id},
                {type: 'text', content: review.rating},
                {type: 'text', content: review.title},
                {type: 'text', content: review.content},
                {type: 'text', content: (parseInt(review.likes_counter) - parseInt(review.dislikes_counter))},
                {type: 'commentsButton', content: 'Comments'},
                {type: 'text', content: review.username},
                {type: 'text', content: review.book_title},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);

        });
        dispatch(clearComments());
        dispatch(setReviews(reviewDataRows));
        loadBookData(dispatch, token);
        
    } catch (error) {
        errorMsg = errorHandling(error);
        alert(errorMsg);
    }
};

const loadCommentData = async(dispatch, id, token) =>{
    try {
        const commentDataRows = [];
        const comments = await getCommentsFromIdReview(id, token);
        comments.forEach(comment => {
            commentDataRows.push([
                {type: 'text', content: comment.id},
                {type: 'text', content: comment.content},
                {type: 'text', content: (parseInt(comment.likes_counter) - parseInt(comment.dislikes_counter))},
                {type: 'text', content: comment.username},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);

        });
        dispatch(setComments(commentDataRows));
        
    } catch (error) {
        if(error.response.status === 404){
            alert("Il n'y a pas de commentaires");
          } else {
            errorMsg = errorHandling(error);
            alert(errorMsg);
          }
    }
};

const loadRoleData = async(dispatch, token) =>{
    try {
        const roleDataRows = [];
        const roles = await getAllRoles(token);
        roles.forEach(role => {
            roleDataRows.push([
                {type: 'text', content: role.id},
                {type: 'text', content: role.book_title},
                {type: 'text', content: role.actor_name},
                {type: 'text', content: role.role_name}
            ]);

        });
        dispatch(setRoles(roleDataRows));
        
    } catch (error) {
        errorMsg = errorHandling(error);
        alert(errorMsg);
    }
};

const loadActorData = async(dispatch, token) =>{
    try {
        const actorDataRows = [];
        const actors = await getAllActors(token);
        actors.forEach(actor => {
            actorDataRows.push([
                {type: 'text', content: actor.id},
                {type: 'text', content: actor.name}
            ]);

        });
        dispatch(setActors(actorDataRows));
        
    } catch (error) {
        errorMsg = errorHandling(error);
        alert(errorMsg);
    }
}

const loadBestBookData = async(dispatch, token) =>{
    try {
        const books = await getAllBooks(token);
        const bestBooks = books.sort((a, b) => b.rating - a.rating).slice(0, 10);
        const bookDataRows = bestBooks.map(book => ([
            { type: 'text', content: book.isbn },
            { type: 'text', content: book.title },
            { type: 'text', content: book.author },
            { type: 'text', content: book.illustrator },
            { type: 'text', content: book.rating },
            { type: 'text', content: book.description },
            { type: 'text', content: book.country },
            { type: 'text', content: book.genre },
            { type: 'text', content: book.released_year },
            { type: 'text', content: book.pages },
            { type: 'text', content: book.publishing_house },
            { type: 'image', content: book.img_path }
        ]));
        dispatch(setBooks(bookDataRows));
    } catch (error) {
        errorMsg = errorHandling(error);
        alert(errorMsg);
    }
};

export {loadBookData, loadUserData, loadReviewData, loadRoleData, loadActorData, loadCommentData, loadBestBookData};


