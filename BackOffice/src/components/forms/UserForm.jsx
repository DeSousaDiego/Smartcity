import {sendForm as APISendForm } from '../../API/user';
import { updateUser as APIUpdateUser, getUserById } from '../../API/user';
import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import countriesList from '../Countries';
import { userSchema } from './ValidationSchemas';
import { setUser, updateUser } from '../../store/slice/userSlice';
import { errorHandling } from '../../error/errorHandling';



function UserForm(){
    const params = useParams();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[country, setCountry] = useState('');  
    const[email, setEmail] = useState('');
    const[role, setRole] = useState('user');
    const[phone, setPhone] = useState('');
    const[newsletter, setNewsletter] = useState(false);
    const[image, setImage] = useState('');
    const newId = useSelector(state => state.users.users.length + 1);
    let errorMsg = "";

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        if(params.type === 'modify'){
            // use getUserById to get the user data from the database
            getUserById(parseInt(params.id), token)
            .then((response) => {
                setUsername(response.username);
                setPassword('');
                setPassword2('');
                setCountry(response.country);
                setEmail(response.email_address);
                setRole(response.role);
                setPhone(response.phone_number);
                setImage('');
                setNewsletter(response.news_letter);
            })
            .catch((error) => {
                errorMsg = errorHandling(error);
                alert(errorMsg);
            });           
        }
        else if(params.type === 'add'){
            setUsername('');
            setPassword('');
            setPassword2('');
            setCountry('');
            setEmail('');
            setPhone('');
            setImage('');
            setNewsletter(false);
        }
    }, [params.type, params.id]);

// write the handleSubmit function here
async function sendForm (event) {
    const formData = new FormData();
    event.preventDefault();
    formData.append('username', username);
    formData.append('email_address', email);
    formData.append('password', password);
    formData.append('password2', password2);
    formData.append('role', role);
    formData.append('country', country);
    formData.append('phone_number', phone);
    formData.append('news_letter', newsletter);
    formData.append('image', image);

    const userData = [
        {type: 'text', content: newId},
        {type: 'text', content: username},
        {type: 'text', content: email},
        {type: 'text', content: role},
        {type: 'text', content: country},
        {type: 'text', content: phone},
        {type: 'boolean', content: newsletter},
        {type: 'image', content: image.name},
        {type: 'modifyButton', content: 'Modify'},
        {type: 'deleteButton', content: 'Delete'}
    ];


    if(params.type === 'add'){
            // formData.append('avatar', avatar.current);
            try {
                userSchema.parse({
                    username,
                    email_address: email,
                    password,
                    password2,
                    role,
                    country,
                    phone_number: phone,
                    news_letter: newsletter
                });

                try {
                    await APISendForm(formData, token);
                    //write the alert here
                    alert('The user has been added to the database');
                    dispatch(setUser(userData));
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
        } else if(params.type === 'modify'){

            // formData.append('avatar', avatar.current);
            try {
                formData.append('id', params.id);
                await APIUpdateUser(formData, token);
                //write the alert here
                alert('The user has been modified in the database');
                dispatch(updateUser(userData));
            } catch (error) {
                errorMsg = errorHandling(error);
                alert(errorMsg);
            }
        }
}

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                    <label className="field">Nom d'utilisateur:
                        <br/>
                        <input 
                        type="text" 
                        name="username"
                        placeholder='Insert...'
                        value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label className="field">Mot de passe:
                        <br/>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder='Insert...'
                        value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label className="field">Confirmer Mot de Passe:
                        <br/>
                        <input 
                        type="password" 
                        name="password2" 
                        placeholder='Insert...'
                        value={password2} onChange={e => setPassword2(e.target.value)} />
                    </label>
                    <label className="field">Email:
                        <br/>
                        <input 
                        type="email" 
                        name="email"
                        placeholder='Insert...' 
                        value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className="field">Role:
                        <br/>
                        <select 
                        name="role" 
                        value={role} onChange={e => setRole(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </label>
                    <label className="countryField">Pays:
                        <br/>
                        <select 
                            name="country" 
                            value={country} 
                            onChange={e => setCountry(e.target.value)}
                        >
                            <option value="">Sélectionner un pays</option>
                            {
                                countriesList.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))
                            }
                        </select>
                    </label>
                    <label className="field">Téléphone:
                        <br/>
                        <input 
                        type="tel" 
                        name="phone" 
                        placeholder='Insert...'
                        value={phone} onChange={e => setPhone(e.target.value)} />
                    </label>
                    <label>Image:
                        <br/>
                        <input
                            type={"file"}
                            accept={"image/*"}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const maxSize = 700 * 1024; // 700KB

                                if (file && file.size > maxSize) {
                                    alert('File is too large, please select a file less than 700KB.');
                                    e.target.value = ''; // Clear the input.
                                } else {
                                    setImage(file);
                                }
                            }}
                        />
                        </label>
                    <label className="field"> 
                        <input 
                        type="checkbox" 
                        name="newsletter" 
                        checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
                        S'abonner à la newsletter: 
                    </label>
                    {params.type === 'modify' ? <button onClick={() => navigate('/v1.0.0/users/add')}>Retour</button> : null}
                    <input type="submit" value="Submit" />
            </form>
                
           
        </>
    );
}
export default UserForm;
