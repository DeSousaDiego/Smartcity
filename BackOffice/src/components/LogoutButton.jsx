import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../API/user";
import { clearToken } from "../store/slice/authSlice";
import { useSelector } from "react-redux";

function LogoutButton() {
    // my name is an 
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const handleClick = async () => {
        try {
            await logout(token);
            navigate('/v1.0.0/Login');
            clearToken();
        } catch (e) {
            console.log(e);
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
  