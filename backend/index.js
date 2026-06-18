import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { setUserToken } from "./util/api.helpers.js"; //import db functions
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
import { createCustomer, getUserByEmail } from "./repository/authRepository.js";
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
import { checkUser, isAdmin, isAdminOrStaff } from "./middleware/auth.js";
import {
  validCartItemBody,
  validId,
  validLoginBody,
  validProduct,
  validProductId,
  validRegisterBody,
  validUser,
  validUserUpdate,
} from "./middleware/petitiondata.js";
import { attachCart } from "./middleware/cart.js";
import {
  deleteUserById,
  insertUser,
  selectAllUsers,
  selectUserById,
  updateUserById,
} from "./repository/usersRepository.js";

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
  }
});

app.get("/products/:id", validId, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await selectProductById(id);
    if (!data) {
      throw new Error("Product " + id + " Not Found");
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json(getError(e, "get", "product with id"));
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
  }
});

app.delete("/products/slug/:slug", isAdminOrStaff, async (req, res) => {
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
  }
});

app.delete("/products/:id", isAdminOrStaff, validId, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await deleteProductById(id);
    if (!response) {
      return res.status(404).json(getError("Not Found", "delete", "product"));
    }
    res.status(200).json(getFeedback("deleted"));
  } catch (e) {
    res.status(404).json(getError(e, "delete", "product with id"));
  }
});

app.post("/products", isAdminOrStaff, validProduct, async (req, res) => {
  try {
    const product = req.body;
    const response = await insertProduct(product);
    if (response) {
      res.status(201).json(getFeedback("created"));
    } else {
      throw new Error("Cannot insert product");
    }
  } catch (e) {
    res.json(getError(e.message, "post", "product"));
  }
});

app.put(
  "/products/:id",
  isAdminOrStaff,
  validId,
  validProduct,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = req.body;
      const response = await updateProductById(id, product);
      if (!response) {
        return res
          .status(404)
          .json(getError("Not Found", "put", "product with id"));
      }
      res.status(200).json(getFeedback("updated"));
    } catch (e) {
      res.status(404).json(getError(e, "put", "product with id"));
    }
  },
);

app.put(
  "/products/slug/:slug",
  isAdminOrStaff,
  validProduct,
  async (req, res) => {
    try {
      const slug = req.params.slug;
      const product = req.body;
      const response = await updateProductBySlug(slug, product);
      if (!response) {
        return res
          .status(404)
          .json(getError("Not Found", "put", "product with slug"));
      }
      res.status(200).json(getFeedback("updated"));
    } catch (e) {
      res.status(404).json(getError(e, "put", "product with slug"));
    }
  },
);

/* AUTH */
app.post("/register", validRegisterBody, async (req, res) => {
  try {
    const { email, pwd, name } = req.body;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const createdUser = await createCustomer(email, hashedPwd, name);
    if (!createdUser) {
      throw new Error("User could not be created (maybe email already exists)");
    }
    const token = setUserToken(res, createdUser.id, email, "customer", 100);
    res.status(201).json({
      status: "success",
      token: token,
      message: "User created successfully successfully",
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message, error: true });
  }
});

app.post("/login", validLoginBody, async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const user = await getUserByEmail(email);
    if (!user || user == null) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    if (!isPasswordValid) {
      throw new Error("Credencials incorrectes");
    }
    const token = setUserToken(res, user.id, user.email, user.role_name, 100);
    res.status(200).json({
      status: "success",
      token: token,
      message: "User logged successfully successfully",
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.post("/logout", async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax", //depends if is hosted on production or not, configures secure if both front + back are https, and sameSite tu lax if http with both localhost
      path: "/",
    });
    res.json({ status: "success", message: "Logged out successfully" });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.get("/auth/me", checkUser, async (req, res) => {
  try {
    const { user_id, mail, role } = req.user;
    const user = await getUserByEmail(mail);
    res.status(200).json({
      loggedIn: true,
      message: "User logged in",
      user: { user_id: user_id, mail: mail, name: user.name, role: role },
    });
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

/* CART */
app.get("/cart", checkUser, attachCart, async (req, res) => {
  try {
    const { user_id, mail, role } = req.user;
    const cart = req.cart;
    const items = await getCartItemsByCartId(cart.id);
    if (!items) {
      return res.status(500).json({
        status: "error",
        message:
          "Cannot get cart items for user id: " +
          user_id +
          "and for cart id: " +
          cart.id,
        error: true,
      });
    }
    return res.status(200).json({
      status: "success",
      user_id: user_id,
      cart_id: cart.id,
      items: items,
    });
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

app.post(
  "/cart/items",
  checkUser,
  attachCart,
  validCartItemBody,
  async (req, res) => {
    try {
      const productId = req.body.product_id;
      const { user_id } = req.user;
      const cart = req.cart;
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
      res
        .status(401)
        .json({ status: "error", message: e.message, error: true });
    }
  },
);

app.put(
  "/cart/items/:productId",
  validProductId,
  checkUser,
  attachCart,
  async (req, res) => {
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
      const { user_id } = req.user;
      const cart = req.cart;
      const success = await updateProductQuantity(
        cart.id,
        product_id,
        quantity,
      );
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
      res
        .status(401)
        .json({ status: "error", message: e.message, error: true });
    }
  },
);

app.delete("/cart", checkUser, attachCart, async (req, res) => {
  try {
    const { user_id } = req.user;
    const cart = req.cart;
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

app.delete(
  "/cart/items/:productId",
  checkUser,
  attachCart,
  validProductId,
  async (req, res) => {
    try {
      const { user_id } = req.user;
      const cart = req.cart;
      const product_id = parseInt(req.params.productId);
      const success = await deleteProductFromCart(cart.id, product_id);
      if (!success) {
        return res
          .status(404)
          .json(
            getError("Can't delete cart item", "delete", "product from cart"),
          );
      }
      res.status(200).json(getFeedback("product removed from cart"));
    } catch (e) {
      res
        .status(401)
        .json({ status: "error", message: e.message, error: true });
    }
  },
);

/* USERS - ADMIN */
app.get("/admin/users", isAdmin, checkUser, async (req, res) => {
  try {
    const data = await selectAllUsers();
    res.status(200).json(data);
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
});

app.get("/admin/users/:id", isAdmin, validId, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await selectUserById(id);
    if (!data) {
      throw new Error("User " + id + " Not Found");
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json(getError(e, "get", "user with id"));
  }
});

app.post("/admin/users", isAdmin, validUser, async (req, res) => {
  try {
    const user = req.body;
    user.pwd = await bcrypt.hash(user.pwd, 10);
    const response = await insertUser(user);
    if (response) {
      res.status(201).json(getFeedback("created"));
    } else {
      throw new Error("Cannot insert user");
    }
  } catch (e) {
    console.log(e);
    res.json(getError(e.message, "post", "user"));
  }
});

app.put("/admin/users/:id", isAdmin, validId, validUserUpdate, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = req.body;
    // Note: password is NOT updated in PUT request
    const response = await updateUserById(id, user);
    if (!response) {
      return res.status(404).json(getError("Not Found", "put", "user with id"));
    }
    res.status(200).json(getFeedback("updated"));
  } catch (e) {
    res.status(404).json(getError(e, "put", "user with id"));
  }
});

app.delete("/admin/users/:id", isAdmin, validId, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await deleteUserById(id);
    if (!response) {
      return res.status(404).json(getError("Not Found", "delete", "user"));
    }
    res.status(200).json(getFeedback("deleted"));
  } catch (e) {
    res.status(404).json(getError(e, "delete", "user with id"));
  }
});
