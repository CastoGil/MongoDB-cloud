import express from "express";
import {
  newCart,
  cartIdproduct,
  idCartIdProductAdd,
} from "../Dao/controllerDb/cartManager.js";
const router = express.Router();

//Ruta de Carrito
router.post("/", newCart);
router.get("/:cid", cartIdproduct);
router.post("/:cid/product/:pid", idCartIdProductAdd);

export default router;
