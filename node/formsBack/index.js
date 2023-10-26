import express from "express";
import mysql from "mysql2";

const app = express();
const PORT = 8000;

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"formlesson"
});

connexion.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("connecté à la database");
    }
})

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post("/addUser", (req,res) => {
    console.log(req.body);
    const { name, email, password} = req.body;
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];
    connexion.query(sql, values, (err, resultat) => {
        if (err) throw err;
        console.log(resultat);
        res.end();
    });
})

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
});

