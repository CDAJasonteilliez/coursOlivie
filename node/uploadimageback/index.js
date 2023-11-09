import express from "express";
import connexion from './database/index.js';
import multer from "multer";
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {

      cb(null, path.join(__dirname, "/upload"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  }),
  limits : {
    fileSize: 8000
  },
  fileFilter : (req, file, cb) => {
    console.log(file);
    cb(null,true);
  }
});

const app = express();
const PORT = 8000;

connexion;

app.use(express.static(path.join(__dirname, "upload")))
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post('/register', upload.single("avatar"), async (req,res) => {
  let avatar;
  if (req.file === undefined) {
    avatar = null;
  } else {
    avatar = req.file.filename;
  }
  const {username, email, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlVerify = "SELECT * FROM users WHERE email = ?"
  connexion.query(sqlVerify, [email], (err, resultat) => {
    if (err) throw err;
    if (resultat.length) {
      let isEmail = { message: "Email existant" };
      if (avatar) {
        const filePath = path.join(__dirname, "/upload", avatar);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Erreur suppression fichier");
          }
          console.log("Fichier supprimé");
        });
      }
      console.log({ avatar });
      res.status(200).json(isEmail);
    } else {
      const sql = "INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)";
      connexion.query(sql, [username, email, hashedPassword, avatar], (err, result) => {
        if (err) throw err;
        res.status(200).json({ messageGood: "Inscription réussie ! Vous allez être redirigé(e)" });
      })
    }
  })
})

app.post('/login', async (req,res) => {
  const { email, password } = req.body;
  let sql = "SELECT * FROM users WHERE email = ?";
  connexion.query(sql, [email], async (err, resultat) => {
    if (err) throw err;
    if (resultat.length === 0) {
      res.status(200).json({ message: "Connection refuse" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, resultat[0].password)
      if (!isPasswordValid) {
        res.status(200).json({ message: "Connection refuse" });
      } else {
        res.status(200).json({ 
          messageGood: "Connection réussie, Vous allez être redirigé(e)",
          id: resultat[0].id
        });
      }
    }
  });
});

app.get('/getUser/:id', (req, res) => {
  console.log(req.params);
  let id = req.params.id
  const sql = "SELECT username, email, avatar FROM users WHERE id = ?";
  connexion.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result[0]);
  })
})

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
  });