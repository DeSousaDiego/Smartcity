import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { sendForm as APISendForm } from '../../API/comment';
import { updateComment as APIUpdateComment } from '../../API/comment';
import { setComment, updateComment } from '../../store/slice/commentSlice';
import { getComment } from '../../API/comment';
import { getReviewById } from '../../API/review';
import { useSelector } from 'react-redux';
import { getUserById } from '../../API/user';
import { useDispatch } from 'react-redux';

function CommentForm(){
    const params = useParams();
    const[content, setContent] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const newId = useSelector(state => state.comments.comments.length + 1);
    // const id = useSelector(state => state.token.value.id);

    useEffect(() => {
        if(params.type === 'modify'){
            getComment(parseInt(params.id))
            .then((response) => {
                setContent(response.content);
            }).catch((error) => {
                console.log(error);
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
        const review = await getReviewById(parseInt(params.id), token);
        const user = await getUserById(parseInt(params.id), token);
        formData.append('content', content);

        const commentData = [
            {type: 'text', content: newId},
            {type: 'text', content: content},
            {type: 'text', content: 0},
            {type: 'text', content: user.username},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ];
        switch (params.type) {
            case 'add':
                formData.append('review_id', params.id);
                console.log("token CommentForm: ", token);
                try {
                    console.log('formData', formData);
                    await APISendForm(formData, token);
                    console.log('OK');
                    alert('The comment has been added to the database');
                    dispatch(setComment(commentData));
                } catch (e) {
                    console.log(e);
                    alert('An error occured');
                }
                break;

            case 'modify':
                try {
                    await APIUpdateComment(parseInt(params.id), formData, token);
                    console.log('OK');
                    alert('The comment has been modified');
                    dispatch(updateComment(params.id));
                } catch (e) {
                    console.log(e);
                    alert('An error occured');
                }
                break;
        }
        navigate(0);
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                <label htmlFor="content">Content</label>
                <input 
                    type="text" 
                    name="content" 
                    value={content} onChange={(event) => setContent(event.target.value)}/>
                    {params.type === 'modify' ? <button onClick={() => navigate('/comments/add')}>Cancel</button> : null}
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

export default CommentForm;