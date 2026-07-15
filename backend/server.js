import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const API = path.resolve(__dirname, '../public/api.json');
const uploadPath = path.join(__dirname, '../public/Images/Cover')

app.use(cors());
app.use(express.json());
app.use('/upload', express.static(uploadPath));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const readAPI = () => {
    const data = fs.readFileSync(API, 'utf-8');
    return JSON.parse(data);
};

const writeAPI = (data) => {
    fs.writeFileSync(API, JSON.stringify(data, null, 2), 'utf-8');
};

// API ENDPOINT

// UPLOAD FILE
app.post('/api/upload', upload.single('image'), (req, res) => {
  const fileUrl = req.file ? `http://localhost:${PORT}/upload/${req.file.filename}` : ""
  res.status(200).json({ message: 'Sukses!', url: fileUrl });
});

// READ CHARACTERS
app.get('/api/characters', (req, res) => {
    const db = readAPI();
    res.json(db.result.characters);
});

// READ BOOKS
app.get('/api/books', (req, res) => {
    const db = readAPI();
    res.json(db.result.books);
});

// READ WIKIS
app.get('/api/wikis', (req, res) => {
    const db = readAPI();
    res.json(db.result.wikis);
});

// READ ADMIN NOTES
app.get('/api/notes', (req, res) => {
    const db = readAPI();
    res.json(db.result.notes);
});

// READ TIMELINES
app.get('/api/timelines', (req, res) => {
    const db = readAPI();
    res.json(db.result.timelines);
});

// READ WORLDS
app.get('/api/worlds', (req, res) => {
    const db = readAPI();
    res.json(db.result.worlds);
});

// CREATE CHARACTER
app.post('/api/characters', (req, res) => {
    const db = readAPI();
    const newCharacter = {
        CharId: Date.now().toString(),
        ...req.body
    };
    
    db.result.characters.push(newCharacter);
    writeAPI(db);
    
    res.status(201).json({ message: 'Adding Characters Succesfully!', data: newCharacter });
});

// CREATE BOOK
app.post('/api/books', (req, res) => {
    const db = readAPI();
    const newBook = {
        BookId: Date.now(),
        ...req.body
    };

    db.result.books.push(newBook);
    writeAPI(db);

    res.status(201).json({ message: 'Adding Book Successfully!', data: newBook });
});

// CREATE WIKI
app.post('/api/wikis', (req, res) => {
    const db = readAPI();
    const newWikis = {
        WikiId: Date.now(),
        ...req.body
    };

    db.result.wikis.push(newWikis);
    writeAPI(db);

    res.status(201).json({ message: 'Adding Wiki Successfully!', data: newWikis });
});

// CREATE NOTES
app.post('/api/notes', (req, res) => {
    const db = readAPI();
    const newNote = {
        NoteId: Date.now(),
        ...req.body
    };

    db.result.notes.push(newNote);
    writeAPI(db);

    res.status(201).json({ message: 'Adding Note Successfully!', data: newNote });
});

// CREATE CHAPTERS
app.post('/api/books/:BookId/chapters', (req, res) => {
    const db = readAPI();
    const { BookId } = req.params;
    const book = db.result.books.find(b => b.BookId && b.BookId === BookId);

    if (!book) {
        return res.status(404).json({ message: 'Book Not Found!' });
    }

    const newChapter = { ...req.body };
    if (!Array.isArray(book.chapters)) book.chapters = [];
    book.chapters.push(newChapter);
    writeAPI(db);

    res.status(201).json({ message: 'Adding New Chapter Successfully!', data: newChapter });
});

// UPDATE CHAPTER STATUS
app.put('/api/books/:BookId/chapters/:chapterIndex', (req, res) => {
    const db = readAPI();
    const { BookId, chapterIndex } = req.params;
    const book = db.result.books.find(b => b.BookId && b.BookId === BookId);

    if (!book) {
        return res.status(404).json({ message: 'Book Not Found!' });
    }

    const index = Number(chapterIndex);
    if (Number.isNaN(index) || index < 0) {
        return res.status(400).json({ message: 'Invalid chapter index.' });
    }

    if (!Array.isArray(book.chapters) || index >= book.chapters.length) {
        return res.status(404).json({ message: 'Chapter Not Found!' });
    }

    book.chapters[index] = {
        ...book.chapters[index],
        ...req.body
    };

    writeAPI(db);
    res.json({ message: 'Chapter updated successfully!', data: book.chapters[index] });
});

// DELETE CHARACTER
app.delete('/api/characters/:CharId', (req, res) => {
    const db = readAPI();
    const { CharId } = req.params;
    const initialLength = db.result.characters.length;

    db.result.characters = db.result.characters.filter(char => char.CharId !== CharId);

    if (db.result.characters.length === initialLength) {
        return res.status(404).json({ message: 'Character Not Found!' });
    }

    writeAPI(db);
    res.json({ message: 'Character Deleted!' });
});

app.listen(PORT, () => {
    console.log(`Server Running in... : http://localhost:${PORT}`);
});