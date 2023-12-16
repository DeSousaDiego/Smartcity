import { useState } from 'react';
import '../../stylesheet/backoffice.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { sendForm as APISendForm } from '../../API/review';
import { updateReview as APIUpdateReview } from '../../API/review';
import { getReviewById } from '../../API/review';
import { getBookById } from '../../API/book';
import { setReview, updateReview } from '../../store/slice/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

function ReviewForm(){
    const params = useParams();
    const[bookISBN, setBookISBN] = useState('');
    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const[rating, setRating] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newID = useSelector(state => state.reviews.reviews.length + 1);
    const token = useSelector(state => state.auth.token);


    useEffect(() => {
        if(params.type === 'modify'){
            console.log('params.id', params.id);
            getReviewById(parseInt(params.id), token)
            .then((response) => {
                setBookISBN(response.book_id);
                setTitle(response.title);
                setContent(response.content);
                setRating(response.rating); 
            }).catch((error) => {
                console.log(error);
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

                try {
                    await APISendForm(formData, token);
                    console.log('OK');
                    alert('The review has been added to the database');
                    dispatch(setReview(reviewData));
                } catch (e) {
                    console.log(e);
                }
                break;
            case 'modify':
                try {
                    await APIUpdateReview(params.id, formData, token);
                    console.log('OK');
                    alert('The review has been modified');
                    dispatch(updateReview(params.id));
                } catch (e) {
                    console.log(e);
                }
                break;             
        }
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>

                    {(params.type === 'add' ? 
                    <label className="field">Book ISBN:
                        <br/>
                        <input
                        type="text"
                        name="bookISBN"
                        placeholder='Insert...'
                        value={bookISBN} onChange={e => setBookISBN(e.target.value)} 
                        />
                    </label> : <></>)}
                    <label className="field">Title:
                        <br/>
                        <input
                        type="text"
                        name="title"
                        placeholder='Insert...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="largeField">Content:
                        <br/>
                        <textarea
                        type="text"
                        name="contentReview"
                        placeholder='Insert...'
                        value={content} onChange={e => setContent(e.target.value)} />
                    </label>
                    <label className="field">Rating:
                        <br/>
                        <input
                        type="number"
                        name="rating"
                        placeholder='Insert...'
                        value={rating} onChange={e => setRating(e.target.value)} />
                    </label> 
                    {params.type === 'modify' ? <button onClick={() => navigate('/v1.0.0/reviews/add')}>Cancel</button> : null}
                    <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ReviewForm;
