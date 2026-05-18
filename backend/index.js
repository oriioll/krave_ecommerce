import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
//import db functions
import {
  selectAllProducts,
  selectProductById,
  selectProductBySlug,
  insertProduct,
  deleteProductById,
  deleteProductBySlug,
  updateProductBySlug,
  updateProductById,
} from "./repository/productsRepository.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;
const getFeedback = (op) => {
  return {
    message: "Product" + op + "successfully",
    status: "success",
  };
};

const getError = (log, op, data) => {
  return {
    error: true,
    message: `Cannot ${op} ${data}`,
    log: log,
    status: "error",
    code: 500,
  };
};

app.listen(PORT, () => {
  console.log("Server listing on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("PRODUCTS API");
});

app.get("/products", async (req, res) => {
  try {
    const data = await selectAllProducts();
    res.json(data);
  } catch (e) {
    res.status(500).json(getError(e, "get", "products"));
    console.log(e);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id < 0 || isNaN(id)) {
      throw new Error("Invalid product id");
    }
    const data = await selectProductById(id);
    if (!data) {
      throw new Error("Product " + id + " Not Found");
    }
    res.json(data);
  } catch (e) {
    res.status(404).json(getError(e, "get", "product with id"));
    console.log(e);
  }
});

app.get("/products/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = await selectProductBySlug(slug);
    if (!data) {
      throw new Error("Product " + slug + " Not Found");
    }
    res.json(data);
  } catch (e) {
    res.status(404).json(getError(e, "get", "product with slug"));
    console.log(e);
  }
});

app.delete("/products/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const response = await deleteProductBySlug(slug);
    if (!response) {
      return res
        .status(404)
        .json(getError("Not Found", "delete", "product with slug"));
    }
    res.json(getFeedback("deleted"));
  } catch (e) {
    res.status(404).json(getError(e, "delete", "product with slug"));
    console.log(e);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id < 0 || isNaN(id)) {
      throw new Error("Invalid product id");
    }
    const response = await deleteProductById(id);
    if (!response) {
      return res.status(404).json(getError("Not Found", "delete", "product"));
    }
    res.json(getFeedback("deleted"));
  } catch (e) {
    res.status(404).json(getError(e, "delete", "product with id"));
    console.log(e);
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    const response = await insertProduct(product);
    if (response) {
      res.json(getFeedback("created"));
    } else {
      throw new Error("Cannot insert product");
    }
  } catch (e) {
    res.status(500).json(getError(e, "post", "product"));
    console.log(e);
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id < 0 || isNaN(id)) {
      throw new Error("Invalid product id");
    }
    const response = await updateProductById(id, req.body);
    if (!response) {
      return res
        .status(404)
        .json(getError("Not Found", "put", "product with id"));
    }
    res.json(getFeedback("updated"));
  } catch (e) {
    res.status(404).json(getError(e, "put", "product with id"));
    console.log(e);
  }
});

app.put("/products/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const response = await updateProductBySlug(slug, req.body);
    if (!response) {
      return res
        .status(404)
        .json(getError("Not Found", "put", "product with slug"));
    }
    res.json(getFeedback("updated"));
  } catch (e) {
    res.status(404).json(getError(e, "put", "product with slug"));
    console.log(e);
  }
});
