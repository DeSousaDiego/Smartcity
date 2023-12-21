import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, checkToken } from '../../API/user';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slice/authSlice';
import { errorHandling } from '../../error/errorHandling';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const APILogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const token = (await login(formData)).token;
            const response = await checkToken(token);
            if(token !== undefined){
                dispatch(setToken(token));
                navigate('/v1.0.0/Acceuil');
            } else {
                alert('Wrong username or password');
            }
            
        } catch (error) {
            const errorMsg = errorHandling(error);
            alert(errorMsg);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        APILogin();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="field">Nom d'utilisateur:
                    <br/>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder='Insérer...' 
                    value={username} onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label className="field">Mot de passe:
                    <br/>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Insérer...' 
                    value={password} onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Connection" />
            </form>
        </>
    );
}

export default Login;