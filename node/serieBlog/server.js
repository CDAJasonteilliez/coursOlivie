import express from "express";
import mysql from "mysql2";
import connexion from './database/index.js';
import routes from "./routes/index.js";

const app = express();
const PORT = 8000;

connexion;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
  });