import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import db functions
import {selectAllProducts, selectProductById} from './repository/productsRepository.js';

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
  } catch(e) {
    const error = {
      message: "Cannot get products",
      log: e,
      status: "error",
      code: 500
    };
    res.status(500).json(error);
    console.log(e);
  }
})

app.get("/product/:id", async(req, res) => {
  try {
    const id = parseInt(req.params.id);
    if(id<0) {
      throw new Error("Invalid product id: Negative number")
    }
    const data = await selectProductById(id);
    if(!data) {
      throw new Error("Product " + id + "Not Found");
    }
    res.json(data)
  }catch(e) {
    const error = {
      message: `Cannot get product num: ${req.params.id}`,
      log: e,
      status: "error",
      code: 500
    };
    res.status(500).json(error);
    console.log(e);
  }
})