import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {

    const navigate = useNavigate();

    //attribute and set method for new book
    const [addBook, setAddBook] = useState({
        bookTitle: '',
        bookAuthor: '',
        bookDescription: '',
    });

    //update new book field.
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddBook(prevState => ({
          ...prevState,
          [name]: value
        })
    )};

    //Handle submission to add new book
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/book/add`, addBook)
        .then(response => {
          console.log('Book added: ', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the book!', error);
        });

        navigate('/api/v1/book');
    };

    //Handle add button click
    const handleBookList = () => {
        navigate('/api/v1/book');
    };

    return (
        <>
            <div>
                <button onClick={() => handleBookList()}>Show Book List</button>
                <h1>Add Book</h1>
                <p>Create new book</p>
                <br/>
            </div>
            <div className='container'>
                <div className="form">
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="bookTitle">Title</label>
                        <input type="text" name="bookTitle" id="bookTitle" placeholder="title..." onChange={handleChange}/>
                        
                        <label htmlFor="bookAuthor">Author</label>
                        <input type="text" name="bookAuthor" id="bookAuthor" placeholder="author..." onChange={handleChange}/>
                        
                        <label htmlFor="bookDescription">Description</label>
                        <input type="text" name="bookDescription" id="bookDescription" placeholder="description..." onChange={handleChange}/>
                        
                        <button type="submit" name="addBook" id="addBook">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default AddBook;