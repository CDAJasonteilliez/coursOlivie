import express from "express";
import mysql from "mysql2";

const app = express();
const PORT = 8000;

const connexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myblog",
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

app.get("/articles", (req, res) => {
    const sql = "SELECT * FROM articles";
    connexion.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    connexion.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})


app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
