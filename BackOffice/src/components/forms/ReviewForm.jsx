import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sendForm as APISendForm } from '../../API/review';
import { updateReview as APIUpdateReview } from '../../API/review';
import { getReviewById } from '../../API/review';
import { getBookById } from '../../API/book';
import { setReview, updateReview } from '../../store/slice/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { reviewSchema } from './ValidationSchemas';
import { errorHandling } from '../../error/errorHandling';

function ReviewForm(){
    const params = useParams();
    const[bookISBN, setBookISBN] = useState('');
    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const[rating, setRating] = useState('');
    let errorMsg = "";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newID = useSelector(state => state.reviews.reviews.length + 1);
    const bookList = useSelector(state => state.books.books);
    const token = useSelector(state => state.auth.token);


    useEffect(() => {
        if(params.type === 'modify'){
            getReviewById(parseInt(params.id), token)
            .then((response) => {
                setBookISBN(response.book_id);
                setTitle(response.title);
                setContent(response.content);
                setRating(response.rating); 
            }).catch((error) => {
                errorMsg = errorHandling(error);
                alert(errorMsg);
            });
        }
        else if(params.type === 'add'){
            setBookISBN('');
            setTitle('');
            setContent('');
            setRating('');
        }
    }, [params.type, params.id]);


    async function sendForm(event){
        const formData = new FormData();
        event.preventDefault();
        try {
            reviewSchema.parse({
                isbn: bookISBN,
                title,
                content,
                rating: parseInt(rating)
            }); 
                           
            const book = await getBookById(bookISBN, token);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('rating', rating);

            const reviewData = [
                {type: 'text', content: newID},
                {type: 'text', content: rating},
                {type: 'text', content: title},
                {type: 'text', content: content},
                {type: 'text', content: 0},
                {type: 'commentsButton', content: 'Comments'},
                {type: 'text', content: book.title},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ];
            switch (params.type) {
                case 'add':
                    formData.append('user_id', parseInt(params.id));
                    formData.append('book_id', bookISBN);
                    try{
                        await APISendForm(formData, token);
                        alert('The review has been added to the database');
                        dispatch(setReview(reviewData));
                    } catch (error) {
                        errorMsg = errorHandling(error);
                        alert(errorMsg);
                    } 
                    break;
                case 'modify':
                    try {
                        await APIUpdateReview(params.id, formData, token);
                        alert('The review has been modified');
                        dispatch(updateReview(params.id));
                    } catch (error) {
                        errorMsg = errorHandling(error);
                        alert(errorMsg);
                    }
                    break;             
            }
        }   catch (error) {
            const validationErrors = error.errors.map((fieldError) => ({
                fieldName: fieldError.path.join('.'),
                error: fieldError.message,
            }));
        
            const errorMsg = validationErrors
                .map(({ fieldName, error }) => `${fieldName}: ${error}`)
                .join('\n');
            alert("Champs de formulaire incorrects : \n" + errorMsg);
        }
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>

                    {(params.type === 'add' ? 
                    <label className="field">Titre du livre:
                        <br/>
                        <select 
                            value={bookISBN} 
                            required
                            onChange={e => setBookISBN(e.target.value)}
                        >
                            <option value="">Choisissez un livre</option>
                            {
                                bookList.map(book => (
                                    <option key={book[0].content} value={book[0].content}>
                                        {book[1].content}
                                    </option>
                                ))
                            }
                        </select>
                    </label> : <></>)}
                    <label className="field">Titre:
                        <br/>
                        <input
                        type="text"
                        name="title"
                        required
                        placeholder='Insérer...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="largeField">Contenu:
                        <br/>
                        <textarea
                        type="text"
                        name="contentReview"
                        required
                        placeholder='Insérer...'
                        value={content} onChange={e => setContent(e.target.value)} />
                    </label>
                    <label className="field">Note:
                        <br/>
                        <input
                        type="number"
                        name="rating"
                        required
                        placeholder='Insérer...'
                        value={rating} onChange={e => setRating(e.target.value)} />
                    </label> 
                    {params.type === 'modify' ? <button onClick={() => navigate('/v1.0.0/reviews/add')}>Retour</button> : null}
                    <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ReviewForm;
