import express from "express";
import data from "./data.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`));
