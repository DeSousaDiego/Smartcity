import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheet/backoffice.css';
import { useState } from 'react';
import { login } from '../../API/user';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slice/authSlice';
import { useSelector } from 'react-redux';


function Login() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const APILogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const token = (await login(formData)).token;
            if(token !== undefined){
                console.log("token Login: ", token);
                dispatch(setToken(token));
                console.log("done");
                navigate('/v1.0.0/Acceuil');
            } else {
                alert('Wrong username or password');
            }
            
        } catch (e) {
            alert('Server error');
        }
    };

    // Write a function that will handle the login form submission
    // It should prevent the default action of the event
    // It should log the username and password to the console
    // It should clear the form
    const handleSubmit = (e) => {
        e.preventDefault();
        APILogin();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="field">Username:
                    <br/>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder='Insert...' 
                    value={username} onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label className="field">Password:
                    <br/>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Insert...' 
                    value={password} onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default Login;