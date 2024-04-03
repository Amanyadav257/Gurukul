import mysql from "mysql";
import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 9002;
// app.setMaxListeners(0);
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cors());

connectDB;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });