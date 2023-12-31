import React from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../stylesheet/backoffice.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteUser as deleteUserAPI } from "../API/user";
import { deleteBook as deleteBookAPI } from "../API/book";
import { deleteReview as deleteReviewAPI } from "../API/review";
import { deleteComment as deleteCommentAPI } from "../API/comment";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  deleteUser } from "../store/slice/userSlice";
import { deleteBook } from "../store/slice/bookSlice";
import { deleteReview } from "../store/slice/reviewSlice";
import { deleteComment } from "../store/slice/commentSlice";

//write a button that delete a line from a table, that recieve the name of the table and the id of the line
 
function DeleteButton({id}) {

  
  const [showAlert, setShowAlert] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  

  let deleteData = null;
  switch (params.name) {
    case "users":
      deleteData = async () => {
        try { 
          await (deleteUserAPI(id, token));
          alert("Utilisateur supprimé avec succès");
          dispatch(deleteUser(id));
        } catch (e) {
          console.log(e);
        }
      }; 
      break;
      case "books" :
        deleteData = async() =>{
          try {
            await deleteBookAPI(id,token);
            alert("Livre supprimé avec succès");
            dispatch(deleteBook(id));
          } catch (e) {
            console.log(e);
          }
        }
      break;
      case "reviews":
        deleteData = async (id) => {  
          try {
            await deleteReviewAPI(id);
            alert("Commentaire supprimé avec succès");
            dispatch(deleteReview(id));
          } catch (e) {
            console.log(e);
          }
        };
      break;
      case "comments":
        deleteData = async (id) => {  
          try {
            await deleteCommentAPI(id);
            alert("Commentaire supprimé avec succès");
            dispatch(deleteComment(id));
          } catch (e) {
            console.log(e);
          }
        };
      }
  
  const handleClick = () => {
    deleteData();

  };


  return (
    <>
      <Popup
        trigger={<button className="button"> <FaRegTrashAlt/> </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Delete </div>
            <div className="content">
              {' '}
              Are you sure you want to delete this line?{' '}
            </div>
            <div className="actions">
              <button className="button" onClick={() => {
                  handleClick();
                  close();
                }}
              >
                Yes
              </button>
              <button className="button" onClick={() => {
                  setShowAlert(false);
                  close();
                }}
              >
                No
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

export default DeleteButton;