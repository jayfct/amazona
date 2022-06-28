import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/usersModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  await User.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  const createdUser = await User.insertMany(data.users);
  res.send({ createdUser, createdProducts });
});

export default seedRouter;
