import mongoose from 'mongoose';

    // define Schema Class
    const Schema = mongoose.Schema;

    // Create a Schema object
    const booksSchema = new Schema({
        id: { type: String, required: true }, //, unique: true
        imgSrc: { type: String, required: true },
        bookTitle: { type: String, required: true },
        bookAuthor: { type: String, required: true },
        bookDescription: { type: String }
    });

    const BookModel = mongoose.model("300371029-elton", booksSchema);

export default BookModel;