import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

//@desc   Fetch all products
//@routes GET /api/products
//@access Public

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
