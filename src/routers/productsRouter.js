import express from "express";
import {
  addProduct,
  allProducts,
  productId,
  updatedProduct,
  deleteProduct,
} from "../Dao/controllerDb/productsManager.js";

const router = express.Router();

//Rutas de Productos//
router.get("/", allProducts);
router.get("/:pid", productId);
router.post("/", addProduct);
router.put("/:pid", updatedProduct);
router.delete("/:pid", deleteProduct);

export default router;
