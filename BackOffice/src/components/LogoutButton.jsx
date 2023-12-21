import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../API/user";
import { clearToken } from "../store/slice/authSlice";
import { useSelector } from "react-redux";
import { errorHandling } from "../error/errorHandling";

function LogoutButton() {
    // my name is an 
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const handleClick = async () => {
        try {
            const response = await logout(token);
            if(response.status === 200){
              navigate('/v1.0.0/Login');
              clearToken();
            }
        } catch (error) {
            const errorMsg = errorHandling(error);
            alert(errorMsg);
        }
    };
  
    return (
      <>
        <button onClick={handleClick}>
            Logout
        </button>
      </>
    );
  }

export default LogoutButton;
  