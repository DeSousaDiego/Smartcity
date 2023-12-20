import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import FormButton from "../FormButton";
import UserForm from "../forms/UserForm";
import BookForm from "../forms/BookForm";
import ReviewForm from "../forms/ReviewForm";
import CommentForm from "../forms/CommentForm";
import { BackOfficeLayout } from "../BackOfficeLayout";
import { useState } from "react";



function Acceuil() {
    const [tableKey, setTableKey] = useState(0);
    const token = useSelector(state => state.auth.token);
    const { name, type } = useParams();


    return (
        <BackOfficeLayout content={
            (name === 'users') ? <FormButton type={type} name={name} form={<UserForm type={type}/>}/> :
            (name === 'books') ? <FormButton type={type} name={name} form={<BookForm type={type}/>}/> :
            (name === 'reviews') ? <FormButton type={type} name={name} form={<ReviewForm type={type}/>}/> :
            (name === 'comments') ? <FormButton type={type} name={name} form={<CommentForm type={type}/>}/> :
            <></>
        }/>
    );
    
}

export default Acceuil;