import { Router } from 'express';
import BookModel from '../models/DBModel.js';

const router = Router();

//Get to load all books
router.route("/api/v1/book")
    .get((req, res) => {
        BookModel.find()
            .then((books) => {
                const result = books.length > 0 ? books.map(book => ({
                    id: book.id,
                    imgSrc: book.imgSrc,
                    bookTitle: book.bookTitle,
                    bookAuthor: book.bookAuthor,
                    bookDescription: book.bookDescription,
                })) : [];
                res.json(result);
            })
            .catch((error) => res.status(400).json("Error: " + error));
    });

//Post to add new book
router.route("/api/v1/book/add")
    .post(async (req, res) => {
        try {
            // Use destructuring assignment to cleanly update book properties
            const { bookTitle, bookAuthor, bookDescription } = req.body;

            let book = {
                id: new Date().toISOString(),
                imgSrc: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
                bookTitle: bookTitle,
                bookAuthor: bookAuthor,
                bookDescription: bookDescription
            }

            //Save into MongoDB.
            const newBook = new BookModel(book);
            await newBook.save();
            res.status(201).json("Document created!");

        } catch (error) {
            res.status(500).json({ error: 'Error fetching data' });
        }
    });

//get single book or update it
router.route("/api/v1/book/:id")
    .get((req, res) => {
        BookModel.findOne({ id: req.params.id })
            .then((book) => {
                if (!book) {
                    return res.status(404).json("Book not found");
                }
                res.json(book);
            })
            .catch((error) => res.status(400).json("Error fetching book: " + error));
    })
    .put(async (req, res) => {
        BookModel.findOne({ id: req.params.id })
            .then(async (book) => {
                if (!book) {
                    return res.status(404).json("Book not found");
                }
                // Use destructuring assignment to cleanly update book properties
                const { bookTitle, bookAuthor, bookDescription } = req.body;

                book.bookTitle = bookTitle;
                book.bookAuthor = bookAuthor;
                book.bookDescription = bookDescription;

                await book.save()
                    .then(() => res.status(200).json("Book updated successfully!"))
                    .catch((err) => res.status(400).json("Error updating book: " + err));
            })
            .catch((error) => res.status(400).json("Error finding book: " + error));
    })
    .delete(async (req, res) => {
        try {
            const deletedBook = await BookModel.findOneAndDelete({ id: req.params.id });
            
            if (!deletedBook) {
                return res.status(404).json("Book not found");
            }
            res.status(200).json("Book deleted successfully!");
        } catch (err) {
            res.status(500).json("Error deleting book: " + err.message);
        }
    });

export default router;