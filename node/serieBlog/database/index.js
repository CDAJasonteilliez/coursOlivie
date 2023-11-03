import mysql from "mysql2";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "serie_arras",
});

connexion.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log("connecté à la database");
    }
  });

export default connexion;