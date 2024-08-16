import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Root = () => {

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

    //Handle button click
    const handleClick = () => {

        navigate('/api/v1/book');
    };

    return (
        <>
            <div>
                <h1>Final Exam</h1>
                <p>Elton Evangelista - 300371029</p>
                <p>Click to open the app</p>
                <br />
                <button onClick={() => handleClick()}>Open App</button>
                <br/>
            </div>
        </>
    );
}
export default Root;