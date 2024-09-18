import { prisma } from '../models/bookModel.js';

// Create Book
export const createBook = async (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    try {
        const newBook = await prisma.book.create({
            data: { name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt },
        });
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: { bookId: newBook.id },
        }).code(201);
    } catch (err) {
        return h.response({ status: 'error', message: 'Terjadi kesalahan pada server' }).code(500);
    }
};

// Get All Books
export const getAllBooks = async (request, h) => {
    try {
        const books = await prisma.book.findMany({
            select: { id: true, name: true, publisher: true },
        });
        return h.response({
            status: 'success',
            data: { books },
        }).code(200);
    } catch (err) {
        return h.response({ status: 'error', message: 'Terjadi kesalahan pada server' }).code(500);
    }
};

// Get Book by ID
export const getBookById = async (request, h) => {
    const { bookId } = request.params;
    try {
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            return h.response({
                status: 'fail',
                message: 'Buku tidak ditemukan',
            }).code(404);
        }
        return h.response({
            status: 'success',
            data: { book },
        }).code(200);
    } catch (err) {
        return h.response({ status: 'error', message: 'Terjadi kesalahan pada server' }).code(500);
    }
};

// Update Book
export const updateBook = async (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const updatedAt = new Date().toISOString();

    try {
        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: { name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt },
        });
        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
    } catch (err) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }
};

// Delete Book
export const deleteBook = async (request, h) => {
    const { bookId } = request.params;
    try {
        await prisma.book.delete({ where: { id: bookId } });
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    } catch (err) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }
};
