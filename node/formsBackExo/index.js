import express from "express";
import mysql from "mysql2";

const app = express();
const PORT = 8000;

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"formlessonexo"
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
    const { username, email, password, techno, gender} = req.body;
    const sql = "INSERT INTO users (username, email, password, techno, gender) VALUES (?, ?, ?, ?, ?)";
    const values = [username, email, password, techno, gender];
    connexion.query(sql, values, (err, resultat) => {
        if (err) throw err;
        console.log(resultat);
        let userFromBack = req.body;
        userFromBack.id = resultat.insertId;
        res.status(200).json(userFromBack);
    });
})

app.post("/addHobbies", (req,res) => {
    console.log(req.body);
    const { hobbies, idUser, niveau, } = req.body;
    const sql = "INSERT INTO hobbies (hobbies, idUser, niveau) VALUES (?, ?, ?)";
    const values = [hobbies, idUser, niveau];
    connexion.query(sql, values, (err, resultat) => {
        if (err) throw err;
        console.log(resultat);
        let hobbiesFromBack = req.body;
        hobbiesFromBack.id = resultat.insertId;
        res.status(200).json(hobbiesFromBack);
    });
})

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
});

