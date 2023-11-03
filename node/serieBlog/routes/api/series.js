import express from "express";
import connexion from "../../database/index.js";
const router = express.Router();

router.get('/getSeries', (req,res) => {
    const sql = "SELECT * FROM series"
    connexion.query(sql, (err,result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
})

router.patch('/patchLike', (req,res) => {
    const {id, like} = req.body;

    let sql = "UPDATE series SET `like` = ? WHERE id = ?"
    connexion.query(sql, [like ? 0 : 1, id], (err,resultat) => {
        if (err) throw err;
        res.status(200).json({msg: "ok"});
    });
});

router.delete('/deleteLike', (req,res) => {
    const { id } = req.body;

    const sql= "DELETE FROM series WHERE id = ?"
    connexion.query(sql, [id], (err,resultat) => {
        if (err) throw err;
        res.status(200).json({msg: "ok"});
    });
})

export default router;