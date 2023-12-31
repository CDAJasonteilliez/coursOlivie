import express from "express";
import mysql from "mysql2";
import bcrypt from 'bcrypt';

const app = express();
const PORT = 8000;

const connexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "formlesson",
});

connexion.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connecté à la database");
  }
});

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/addUser", async (req, res) => {
  const { username, email, password, techno, gender, hobbies } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);

  let sql = "SELECT email FROM users WHERE email = ?";
  connexion.query(sql, [email], (err, resultat) => {
    if (err) throw err;
    if (resultat.length !== 0) {
      res.status(200).json({ message: "Email existant" });
    } else {
      sql =
        "INSERT INTO users (username, email, password, techno, gender) VALUES (?, ?, ?, ?, ?)";
      const values = [username, email, hashedPassword, techno, gender];
      connexion.query(sql, values, (err, resultat) => {
        if (err) throw err;
        const userFromBack = req.body;
        userFromBack.id = resultat.insertId;
        sql = "INSERT INTO hobbies (hobby, level, idUser) VALUES (?, ?, ?)";
        hobbies.map((hobbie) => {
          const values2 = [hobbie.value, hobbie.level, userFromBack.id];
          connexion.query(sql, values2, (err, resultat) => {
            if (err) throw err;
          });
        });
        res.status(200).json(userFromBack);
      });
    }
  });
});

app.post("/getUserByEmail",  (req, res) => {
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
        res.status(200).json({ id: resultat[0].idUser });
      }
    }
  });
});

app.post("/getUserProfil", (req, res) => {
  const { idUser } = req.body;
  let sql =
    "SELECT users.idUser, username, email, techno, hobby, level FROM users LEFT JOIN hobbies ON users.idUser = hobbies.idUser WHERE users.idUser = ? ";
  connexion.query(sql, [idUser], (err, resultat) => {
    if (err) throw err;
    console.log("mon resultat:", resultat);
    res.status(200).json(resultat);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
