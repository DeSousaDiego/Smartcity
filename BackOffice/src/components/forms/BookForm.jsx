import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { bookSchema } from './ValidationSchemas';
import { sendForm as APISendForm, updateBook as APIUpdateBook, getBookById } from '../../API/book'
import countriesList from '../Countries';
import { setBook, updateBook } from '../../store/slice/bookSlice';
import { errorHandling } from '../../error/errorHandling';

function BookForm(){
    const params = useParams();
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const[year, setYear] = useState('');
    const[genre, setGenre] = useState('');
    const[country, setCountry] = useState('');
    const[pages, setPages] =useState('');
    const[editor, setEditor] = useState('');
    const[isbn, setIsbn] = useState('');
    const[summary, setSummary] = useState('');
    const[illustrator, setIllustrator] = useState('');
    const[image, setImage] = useState(null);
    let errorMsg = "";
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if(params.type === 'modify'){
            
                getBookById(params.id, token)
                .then((response) => {
                    setTitle(response.title);
                    setAuthor(response.author);
                    setYear(response.released_year.toString());
                    setGenre(response.genre);
                    setCountry(response.country);
                    setPages(response.pages);
                    setEditor(response.publishing_house);
                    setIsbn(response.isbn);
                    setSummary(response.description);
                    setIllustrator(response.illustrator);
                    setImage(response.image);
                })
                .catch((error) => {
                    errorMsg = errorHandling(error);
                    alert(errorMsg);
                });
            }
            else if(params.type === 'add')
            {
                setTitle('');
                setAuthor('');
                setYear('');
                setGenre('');
                setCountry('');
                setPages('');
                setEditor('');
                setIsbn('');
                setSummary('');
                setIllustrator('');
                setImage(null);
            }
    }, [params.type, params.id]);


// write the handleSubmit function here
async function sendForm (event) {
    const formData = new FormData();
    event.preventDefault();
    
    // Validate form data
    try {
        bookSchema.parse({
        title,
        author,
        year,
        genre,
        country,
        pages: parseInt(pages),  // Parse pages as an integer
        editor,
        isbn,
        summary,
        illustrator,
        image,
        });
        formData.append('isbn', isbn);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('released_year', year);
        formData.append('genre', genre);
        formData.append('country', country);
        formData.append('pages', pages);
        formData.append('description', summary);
        formData.append('illustrator', illustrator);
        formData.append('publishing_house', editor);
        formData.append('image', image);
        const bookData = [
            {type: 'text', content: isbn},
            {type: 'text', content: title},
            {type: 'text', content: summary},
            {type: 'text', content: country},
            {type: 'text', content: genre},
            {type: 'text', content: year},
            {type: 'text', content: pages},
            {type: 'text', content: editor},
        ]

            if(params.type === 'add'){

                try {
                    await APISendForm(formData, token);
                    alert('The book has been added to the database');
                    //const book = await getBookById(isbn, token);
                    
                    // bookData.push({})
                    dispatch(setBook());
                } catch (error) {
                    errorMsg = errorHandling(error);
                    alert(errorMsg);
                }
            }
            else if(params.type === 'modify'){
                // formData.append('avatar', avatar.current);
                try {
                    await APIUpdateBook(formData,token);
                    //write the alert here
                    alert('The book has been modified in the database');
                    dispatch(updateBook(bookData));
                } catch (error) {
                    errorMsg = errorHandling(error);
                    alert(errorMsg);
                }
            }
        }
        catch (error) {
            const validationErrors = error.errors.map((fieldError) => ({
                fieldName: fieldError.path.join('.'),
                error: fieldError.message,
            }));
        
            errorMsg = validationErrors
                .map(({ fieldName, error }) => `${fieldName}: ${error}`)
                .join('\n');
            
            alert("Champs de formulaire incorrects : \n", errorMsg);
        }
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                    <label className="field">Titre:
                        <br/>
                        <input
                        type="text"
                        name="title"
                        required
                        placeholder='Insérer...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="field">Maison d'édition:
                        <br/>
                        <input
                        type="text"
                        name="editor"
                        required
                        placeholder='Insérer...'
                        value={editor} onChange={e => setEditor(e.target.value)} />
                    </label> 

                    <label className="countryField">Pays:
                        <br/>
                        <select 
                            name="country" 
                            required
                            value={country} 
                            onChange={e => setCountry(e.target.value)}
                        >
                            <option value="">Select a country</option> {/* Ajoutez cette ligne */}
                            {
                                countriesList.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))
                            }
                        </select>
                    </label>

                    {(params.type === 'add' ? 
                    <label className="field">ISBN:
                        <br/>
                        <input
                        type="text"
                        name="isbn"
                        placeholder='Insérer...'
                        value={isbn} onChange={e => setIsbn(e.target.value)} 
                        />
                    </label> : <></>)}
                    <label className="field">Auteur:
                        <br/>
                        <input
                        type="text"
                        name="author"
                        required
                        placeholder='Insérer...'
                        value={author} onChange={e => setAuthor(e.target.value)} />
                    </label>
                    <label className="field">Year:
                        <br/>
                        <input
                        type="text"
                        name="year"
                        required
                        placeholder='Insérer...'
                        value={year} onChange={e => setYear(e.target.value)} />
                    </label>
                    <label className="field">Pages:
                        <br/>
                        <input
                        type="text"
                        name="pages"
                        required
                        placeholder='Insérer...'
                        value={pages} onChange={e => setPages(e.target.value)} />
                    </label>
                    <label className="field">Genre:
                        <br/>
                        <input
                        type="text"
                        name="genre"
                        required
                        placeholder='Insérer...'
                        value={genre} onChange={e => setGenre(e.target.value)} />
                    </label>                    
                    <label className="largeField">Description:
                        <br/>
                        <textarea
                        id="summary"
                        name="summary"
                        required
                        placeholder='Insérer...'
                        value={summary} onChange={e => setSummary(e.target.value)} />
                    </label>
                    <label className="field">Illustrateur:
                        <br/>
                        <input
                        type="text"
                        name="illustrator"
                        placeholder='Insérer...'
                        value={illustrator} onChange={e => setIllustrator(e.target.value)} />
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
                    <input type="submit" value="Submit" />
            </form>
            
            {params.type === 'modify' ? <button onClick={() => navigate('/v1.0.0/books/add')}>Retour</button> : null}

        </>
    );
}
export default BookForm;