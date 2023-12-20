import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sendForm as APISendForm } from '../../API/comment';
import { updateComment as APIUpdateComment } from '../../API/comment';
import { setComment, updateComment } from '../../store/slice/commentSlice';
import { getComment } from '../../API/comment';
import { getReviewById } from '../../API/review';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../API/user';
import { commentSchema } from './ValidationSchemas';
import { errorHandling } from '../../error/errorHandling';

function CommentForm(){
    const params = useParams();
    const[content, setContent] = useState('');
    let errorMsg = "";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const newId = useSelector(state => state.comments.comments.length + 1);

    useEffect(() => {
        if(params.type === 'modify'){
            getComment(parseInt(params.comment_id), token)
            .then((response) => {
                setContent(response.content);
            }).catch((error) => {
                setErrorMsg(errorHandling(error));
                alert(errorMsg);
            });
        }
        else if (params.type === 'add'){
            setContent('');
        }
    }, [params.type, params.id]);

// write the handleSubmit function here
    const sendForm = async (event) => {
        const formData = new FormData();
        event.preventDefault();
        formData.append('content', content);

        switch (params.type) {
            case 'add':
                const user = await getUserById(parseInt(params.id), token);
                const review = await getReviewById(parseInt(params.id), token);
                formData.append('review_id', params.id);

                try {
                    commentSchema.parse({content});

                    try{
                        await APISendForm(formData, token);
                        alert('The comment has been added to the database');
                        dispatch(setComment());
                    } catch (error) {
                        errorMsg = errorHandling(error);
                        alert(errorMsg);
                    }
                } catch (error) {
                    const validationErrors = error.errors.map((fieldError) => ({
                        fieldName: fieldError.path.join('.'),
                        error: fieldError.message,
                    }));
                
                    errorMsg = validationErrors
                        .map(({ fieldName, error }) => `${fieldName}: ${error}`)
                        .join('\n');
                    
                    alert("Champs de formulaire incorrects : \n", errorMsg);
                }
            break;

            case 'modify':
                try {
                    formData.append("id", params.comment_id);
                    await APIUpdateComment(parseInt(params.comment_id), formData, token);
                    alert('The comment has been modified');
                    dispatch(updateComment(params.id));
                } catch (error) {
                    errorMsg = errorHandling(error);
                    alert(errorMsg);
                }
                break;
        }
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                <label htmlFor="content">Contenu</label>
                <input 
                    type="text" 
                    name="content" 
                    value={content} onChange={(event) => setContent(event.target.value)}/>
                    {params.type === 'modify' ? <button onClick={() => navigate(`/v1.0.0/comments/add/${params.review_id}`)}>Retour</button> : null}
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

export default CommentForm;