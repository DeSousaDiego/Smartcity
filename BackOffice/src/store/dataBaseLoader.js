import { getAllUsers } from '../API/user';
import { getAllBooks } from '../API/book';
import { getAllReviews } from '../API/review';
import { getCommentsFromIdReview } from '../API/comment';
import { getAllRoles } from '../API/role';
import { getAllActors } from '../API/actor';
import { setBooks, clearBooks } from './slice/bookSlice';
import { setReviews, clearReviews } from './slice/reviewSlice';
import { setComments, clearComments } from './slice/commentSlice';
import { setUsers, clearUsers } from './slice/userSlice';
import { setRoles, clearRoles } from './slice/roleSlice';
import { setActors, clearActors } from './slice/actorSlice';


const loadBookData = async(dispatch, token) =>{
    try {
        const bookDataRows = [];
        const books = await getAllBooks(token);
        console.log("books database: ", books);
        books.forEach(book => {
            bookDataRows.push([
                {type: 'text', content: book.isbn},
                {type: 'text', content: book.title},
                {type: 'text', content: book.description},
                {type: 'text', content: book.country},
                {type: 'text', content: book.genre},
                {type: 'text', content: book.released_year},
                {type: 'text', content: book.pages},
                {type: 'text', content: book.publishing_house},
                {type: 'image', content: book.img_path},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        console.log(bookDataRows);
        dispatch(setBooks(bookDataRows));
        dispatch(clearUsers());
        dispatch(clearReviews());
        dispatch(clearComments());
        dispatch(clearRoles());
        dispatch(clearActors());
        console.log("clear");
    } catch (error) {
        console.error("Error fetching data: ", error);
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
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        console.log("userDataRows", userDataRows);
        dispatch(setUsers(userDataRows));
        dispatch(clearBooks());
        dispatch(clearReviews());
        dispatch(clearComments());
        dispatch(clearRoles());
        dispatch(clearActors());
        console.log("clear");
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const loadReviewData = async(dispatch, token) =>{
    try {
        const reviewDataRows = [];
        console.log("coucou");
        const reviews = await getAllReviews(token);
        console.log("reviews database: ", reviews);
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
        dispatch(setReviews(reviewDataRows));
        dispatch(clearBooks());
        dispatch(clearUsers());
        dispatch(clearComments());
        dispatch(clearRoles());
        dispatch(clearActors());
        
    } catch (error) {
        console.error("Error fetching data: ", error);
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
        dispatch(clearBooks());
        dispatch(clearUsers());
        dispatch(clearReviews());
        dispatch(clearRoles());
        dispatch(clearActors());
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const loadRoleData = async(dispatch, token) =>{
    try {
        const roleDataRows = [];
        const roles = await getAllRoles(token);
        console.log("roles database: ", roles);
        roles.forEach(role => {
            roleDataRows.push([
                {type: 'text', content: role.id_book},
                {type: 'text', content: role.actor_name},
                {type: 'text', content: role.role_name}
            ]);

        });
        dispatch(setRoles(roleDataRows));
        dispatch(clearBooks());
        dispatch(clearUsers());
        dispatch(clearReviews());
        dispatch(clearComments());
        dispatch(clearActors());
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const loadActorData = async(dispatch, token) =>{
    try {
        const actorDataRows = [];
        const actors = await getAllActors(token);
        console.log("actors database: ", actors);
        actors.forEach(actor => {
            actorDataRows.push([
                {type: 'text', content: actor.id},
                {type: 'text', content: actor.name}
            ]);

        });
        dispatch(setActors(actorDataRows));
        dispatch(clearBooks());
        dispatch(clearUsers());
        dispatch(clearReviews());
        dispatch(clearComments());
        dispatch(clearRoles());
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

const loadBestBookData = async(dispatch, token) =>{
    try {
        const bookDataRows = [];
        const books = await getAllBooks(token);
        console.log("books database: ", books);
        // for 10 books with the best rating
        console.log(bookDataRows);
        dispatch(setBooks(bookDataRows));
        dispatch(clearUsers());
        dispatch(clearReviews());
        dispatch(clearComments());
        dispatch(clearRoles());
        dispatch(clearActors());
        console.log("clear");
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};


// export const loadDataBase = async (dispatch, token) => {
//     try {
//         await fetchBookData(dispatch, token);
//         await fetchUserData(dispatch, token);
//         await fetchReviewData(dispatch, token);
//         // await fetchCommentData(dispatch, token);
//         await fetchRoleData(dispatch, token);
//         await fetchActorData(dispatch, token);
//     }
//     catch (err) {
//         console.error(err);
//     }
// }

export {loadBookData, loadUserData, loadReviewData, loadRoleData, loadActorData, loadCommentData};


