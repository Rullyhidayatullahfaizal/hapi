import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';

export const bookRoutes = [
    {
        method: 'POST',
        path: '/books',
        handler: createBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBook,
    },
];
