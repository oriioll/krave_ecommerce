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
  deleteAllCartItems,
  getCartByUserId,
  getCartItemsByCartId,
  insertProductIntoCart,
  updateProductQuantity,
  deleteProductFromCart,
} from "./repository/cartRepository.js";
import {
  getFeedback,
  getError,
  validateProduct,
  extractUserFromToken,
} from "./util/api.helpers.js";

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

/* PRODUCTS */
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

  //verify if req is sent from production or dev
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", //depends if is hosted on production or not, configures secure if both front + back are https, and sameSite tu lax if http with both localhost
    maxAge: days * 24 * 60 * 60 * 1000,
  });

  return token;
};
app.post("/register", async (req, res) => {
  try {
    const { email, pwd, name } = req.body;
    if (!email || !pwd || !name) {
      throw new Error("ERROR: falten dades o son incorrectes");
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const createdUser = await createUser(email, hashedPwd, name);
    if (!createdUser) {
      throw new Error("User could not be created (maybe email already exists)");
    }

    const token = setUserToken(res, createdUser.id, email, 100);
    res.status(201).json({
      status: "success",
      token: token,
      message: "User created successfully successfully",
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message, error: true });
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
    const { user_id, mail } = extractUserFromToken(req);
    res.status(200).json({
      loggedIn: true,
      message: "User logged in",
      user: { user_id: user_id, mail: mail },
    });
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

/* CART */
app.get("/cart", async (req, res) => {
  try {
    const { user_id } = extractUserFromToken(req);
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
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

app.post("/cart/items", async (req, res) => {
  try {
    const productId = req.body.product_id;
    if (!productId || isNaN(productId)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or missing productId",
        error: true,
      });
    }
    const { user_id } = extractUserFromToken(req);
    const cart = await getCartByUserId(user_id);
    const success = await insertProductIntoCart(cart.id, productId);
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
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

app.put("/cart/items/:productId", async (req, res) => {
  try {
    const product_id = parseInt(req.params.productId);
    const quantity = parseInt(req.body.quantity);
    if (isNaN(product_id) || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({
        status: "error",
        message: "Lack of data or incorrect",
        error: true,
      });
    }
    const { user_id } = extractUserFromToken(req);
    const cart = await getCartByUserId(user_id);
    const success = await updateProductQuantity(cart.id, product_id, quantity);
    if (!success) {
      return res
        .status(404)
        .json(
          getError(
            "Can't update product into cart (db) - product not found in cart",
            "update",
            "product in cart",
          ),
        );
    }
    res.status(200).json(getFeedback("quantity modified"));
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

app.delete("/cart", async (req, res) => {
  try {
    const { user_id } = extractUserFromToken(req);
    const cart = await getCartByUserId(user_id);
    const success = await deleteAllCartItems(cart.id);
    if (!success) {
      return res
        .status(404)
        .json(
          getError("Can't delete cart items", "delete", "products from cart"),
        );
    }
    res.status(200).json(getFeedback("cart emptied"));
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

app.delete("/cart/items/:productId", async (req, res) => {
  try {
    const { user_id } = extractUserFromToken(req);
    const cart = await getCartByUserId(user_id);
    const success = await deleteProductFromCart(cart.id, productId);
    if (!success) {
      return res
        .status(404)
        .json(
          getError("Can't delete cart item", "delete", "product from cart"),
        );
    }
    res.status(200).json(getFeedback("product removed from cart"));
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});
