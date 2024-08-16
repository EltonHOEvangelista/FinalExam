import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const BookList = () => {

    const navigate = useNavigate();

    //attribute and set method for list of itens
    const [books, setBooks] = useState([]);

    //Fetch data from back-end
    const fetchBooks = () => {
        axios.get(`${import.meta.env.VITE_API_LOCAL_URL}/api/v1/book`)
            .then(response => {
                // Check if the response data is an array
                if (Array.isArray(response.data)) {
                    setBooks(response.data);
                } else {
                    console.error('Expected an array but received:', response.data);
                }
            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    //Handle click over book on the page. Navegate to update
    const handleClick = (book) => {
        navigate(`/api/v1/book/${book.id}`, { state: { book } });
    };

    //Handle delete click
    const handleDelete = (book) => {
        axios.delete(`${import.meta.env.VITE_API_LOCAL_URL}/api/v1/book/${book.id}`)
            .then(response => {
                console.log("Data", response.data);
                fetchBooks();
            })
            .catch(error => {console.error("Error fechting data: ", error)});
    };

    // Handle add button click
    const handleAddBook = () => {
        navigate('/api/v1/book/add');
    };

    //Display empty page.
    if(!books) {
        return <div>Loading...</div>
    }

    //Display page content.
    return (
        <>
            <div>
                <h1>Book List</h1>
                <button onClick={() => handleAddBook()}>+ Add New Book!</button>
                <br/>
            </div>
            <div className="container">
                {books.map((book, index) => (
                    <div key={index} className='card'>                     
                        <img src={book.imgSrc} alt={book.bookTitle}  onClick={() => handleClick(book)} />
                        <h3>{book.bookTitle}</h3>
                        <p>{book.bookAuthor}</p>
                        <p>{book.bookDescription}</p>
                        <button className="delete-btn" onClick={() => handleDelete(book)}>x</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BookList;