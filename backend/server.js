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
    res.json(db.result.admins);
});

// CREATE CHARACTER
app.post('/api/characters', (req, res) => {
    const db = readAPI();
    const newCharacter = {
        id: Date.now().toString(),
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
        id: Date.now(),
        ...req.body
    };

    db.result.books.push(newBook);
    writeAPI(db);

    res.status(201).json({ message: 'Adding Book Successfully!', data: newBook });
});

// DELETE CHARACTER
app.delete('/api/characters/:id', (req, res) => {
    const db = readAPI();
    const { id } = req.params;
    const initialLength = db.result.characters.length;

    db.result.characters = db.result.characters.filter(char => char.id.toString() !== id.toString());

    if (db.result.characters.length === initialLength) {
        return res.status(404).json({ message: 'Character Not Found!' });
    }

    writeAPI(db);
    res.json({ message: 'Character Deleted!' });
});

// // 3. UPDATE (Mengubah data karakter berdasarkan ID)
// app.put('/api/characters/:id', (req, res) => {
//     const db = readDB();
//     const { id } = req.params;
//     const index = db.characters.findIndex(char => char.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: 'Karakter tidak ditemukan' });
//     }

//     // Perbarui data dengan mempertahankan ID lama
//     db.characters[index] = { id, ...req.body };
//     writeDB(db);

//     res.json({ message: 'Karakter berhasil diperbarui!', data: db.characters[index] });
// });

app.listen(PORT, () => {
    console.log(`Server Running in... : http://localhost:${PORT}`);
});