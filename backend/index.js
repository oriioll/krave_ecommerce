import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

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
import { createUser, getUserByEmail } from "./repository/authRepository.js";
import {
  getCartByUserId,
  getCartItemsByCartId,
  insertProductIntoCart,
} from "./repository/cartRepository.js";
import { getFeedback, getError, validateProduct } from "./util/api.helpers.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://krave-ecommerce.vercel.app"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server listing on port " + PORT);
});

app.get("/", (req, res) => {
  res.status(200).send("PRODUCTS API");
});

app.get("/products", async (req, res) => {
  try {
    const data = await selectAllProducts();
    res.status(200).json(data);
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
    res.status(200).json(data);
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
    res.status(200).json(data);
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
    res.status(200).json(getFeedback("deleted"));
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
    res.status(200).json(getFeedback("deleted"));
  } catch (e) {
    res.status(404).json(getError(e, "delete", "product with id"));
    console.log(e);
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    if (!validateProduct(product)) {
      throw new Error("Cannot insert product - NOT VALID");
    }
    const response = await insertProduct(product);
    if (response) {
      res.status(201).json(getFeedback("created"));
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
    if (!validateProduct(req.body)) {
      throw new Error("Cannot update product - NOT VALID");
    }
    const response = await updateProductById(id, req.body);
    if (!response) {
      return res
        .status(404)
        .json(getError("Not Found", "put", "product with id"));
    }
    res.status(200).json(getFeedback("updated"));
  } catch (e) {
    res.status(404).json(getError(e, "put", "product with id"));
    console.log(e);
  }
});

app.put("/products/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!validateProduct(req.body)) {
      throw new Error("Cannot update product - NOT VALID");
    }
    const response = await updateProductBySlug(slug, req.body);
    if (!response) {
      return res
        .status(404)
        .json(getError("Not Found", "put", "product with slug"));
    }
    res.status(200).json(getFeedback("updated"));
  } catch (e) {
    res.status(404).json(getError(e, "put", "product with slug"));
    console.log(e);
  }
});

/* AUTH */
export const setUserToken = (res, user_id, mail, days = 7) => {
  const token = jwt.sign(
    { user_id: user_id, mail: mail },
    process.env.JWT_SECRET,
    { expiresIn: `${days}d` },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: days * 24 * 60 * 60 * 1000,
  });
  return token;
};
app.post("/register", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
      throw new Error("ERROR: falten dades o son incorrectes");
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const createdUser = await createUser(email, hashedPwd);
    if (createdUser && createdUser.error) {
      throw new Error(createdUser.message || "Cannot create user");
    }
    const token = setUserToken(res, createdUser, email, 100);
    res.status(201).json({
      status: "success",
      token: token,
      message: "User created successfully successfully",
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
      throw new Error("ERROR: falten dades o son incorrectes");
    }
    const user = await getUserByEmail(email);
    if (!user || user == null) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    if (!isPasswordValid) {
      throw new Error("Credencials incorrectes");
    }
    const token = setUserToken(res, user.id, user.email, 100);
    res.status(200).json({
      status: "success",
      token: token,
      message: "User logged successfully successfully",
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.get("/auth/me", (req, res) => {
  try {
    //Llegeixo la possible cookie de l'usuari
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ loggedIn: false, message: "No authorized" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_id, mail } = decoded;
      res.status(200).json({
        loggedIn: true,
        message: "User logged in",
        user: { user_id: user_id, mail: mail },
      });
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

/* CART */
app.get("/cart", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ loggedIn: false, message: "No authorized" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { user_id } = decoded;
      const cart = await getCartByUserId(user_id);
      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: "Cart not found",
          error: true,
        });
      }
      const items = await getCartItemsByCartId(cart.id);

      if (!items) {
        return res.status(500).json({
          status: "error",
          message: "Cannot get cart items",
          error: true,
        });
      }
      return res.status(200).json({
        status: "success",
        items: items,
      });
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.post("/carts/items", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "No authorized" });
    }
    const productId = req.body;
    const valid = productId != null || productId != undefined;
    if (!productId || !valid) {
      return res.status(401).json({
        status: "error",
        message: "falten dades o son incorrectes",
        error: true,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { user_id } = decoded;
    const cart = await getCartByUserId(user_id);
    const success = insertProductIntoCart(cart.id, productId);
    if (!success) {
      return res
        .status(404)
        .json(
          getError(
            "Can't insert product into cart (db)",
            "add",
            "product to cart",
          ),
        );
    }
    res.status(200).json(getFeedback("added to cart"));
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});
