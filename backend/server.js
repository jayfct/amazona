import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => console.log(err.message));

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`));
