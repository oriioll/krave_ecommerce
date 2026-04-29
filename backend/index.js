import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import db functions
import {
  selectAllProducts,
  selectProductById,
  selectProductBySlug,
} from "./repository/productsRepository.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server listing on port " + PORT);
});

//crear primer endpoint
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/products", async (req, res) => {
  try {
    const data = await selectAllProducts();
    res.json(data);
  } catch (e) {
    const error = {
      error: true,
      message: "Cannot get products",
      log: e,
      status: "error",
      code: 500,
    };
    res.status(500).json(error);
    console.log(e);
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id < 0) {
      throw new Error("Invalid product id: Negative number");
    }
    const data = await selectProductById(id);
    if (!data) {
      throw new Error("Product " + id + "Not Found");
    }
    res.json(data);
  } catch (e) {
    const error = {
      error: true,
      message: `Cannot get product num: ${req.params.id}`,
      log: e,
      status: "error",
      code: 404,
    };
    res.status(404).json(error);
    console.log(e);
  }
});

app.get("/product/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = await selectProductBySlug(slug);
    if (!data) {
      throw new Error("Product " + slug + "Not Found");
    }
    res.json(data);
  } catch (e) {
    const error = {
      error: true,
      message: `Cannot get product: ${req.params.slug}`,
      log: e,
      status: "error",
      code: 404,
    };
    res.status(404).json(error);
    console.log(e);
  }
});
