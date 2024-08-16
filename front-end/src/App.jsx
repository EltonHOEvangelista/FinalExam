
import React from "react";
import {Route, Routes} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// App components
import AddBook from "./components/AddBook.jsx";
import ListBook from "./components/BookList.jsx";
import UpdateBook from "./components/UpdateBook.jsx";

function App() {

  return (
    <div className='container'>
      <Routes>
        <Route path="/api/v1/book" element={< ListBook/>} />
        <Route path="/api/v1/book/add" element={< AddBook/>} />
        <Route path="/api/v1/book/:id" element={< UpdateBook/>} />
      </Routes>
    </div>
  )
}

export default App
