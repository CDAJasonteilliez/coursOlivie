import express from "express";
const router = express.Router();
import apiSeries from "./series.js";

router.use("/series", apiSeries);

export default router;