
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const UpdateBook = () => {

    const navigate = useNavigate();

    //URL parameter
    const { id } = useParams();

    //attribute and set method.
    const [book, setBook] = useState(null);
    
    //fecth data from back-end
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {console.error("Error fechting data: ", error)});
    }, [id]);

    //update new book field.
    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook(prevState => ({
          ...prevState,
          [name]: value
        })
    )};

    //Handle submission to update book
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/book/${id}`, book)
        .then(response => {
          console.log('Book updated: ', response.data);
        })
        .catch(error => {
          console.error('There was an error updating the book!', error);
        });

        navigate('/api/v1/book');
    };

    //Handle add button click
    const handleBookList = () => {
        navigate('/api/v1/book');
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <button onClick={() => handleBookList()}>Show Book List</button>
                <h1>Update Book</h1>
                <p>Update the following book</p>
                <br/>
            </div>
            <div className='container'>
                <div className="form">
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="bookTitle">Title</label>
                        <input type="text" name="bookTitle" id="bookTitle" value={book.title} onChange={handleChange}/>

                        <label htmlFor="bookAuthor">Author</label>
                        <input type="text" name="bookAuthor" id="bookAuthor" value={book.author} onChange={handleChange}/>
                        
                        <label htmlFor="bookDescription">Description</label>
                        <input type="text" name="bookDescription" id="bookDescription" value={book.description} onChange={handleChange}/>
                        
                        <button type="submit" name="addBook" id="addBook">Update</button>
                    </form>
                </div>
        </div>
        </>
    );
}

export default UpdateBook;