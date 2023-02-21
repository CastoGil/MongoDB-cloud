import { productModel } from "../models/products.js";
//Mostramos los productos
const allProducts = async (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    let products = await productModel.find();
    if (!limit) {
      return res.status(200).json({ products });
    }
    if (limit > products.length) {
      return res.status(400).send("No existen tantos productos");
    } else {
      return res.send(products.slice(0, limit));
    }
  } catch {
    return res.status(404).send("La ruta no se encontro");
  }
};
//Mostramos por Id el producto
const productId = async (req, res) => {
  const pid = req.params.pid;
  try {
    const productId = await productModel.findById(pid);
    return res.send(productId);
  } catch {
    return res.status(404).send("el id no existe");
  }
};
//Agregamos productos
const addProduct = async (req, res) => {
  const body = req.body;
  try {
    let products = await productModel.find();
    if (products.some((e) => e.code === body.code)) {
      throw new Error("code already entered ");
    } else {
      await productModel.create(body);
      return res.status(201).json({ msg: "product saved successfully", body });
    }
  } catch {
    return res.status(500).json({ msg: "Error al crear el producto" });
  }
};
//Actualizamos un producto pasandole los datos necesarios
const updatedProduct = async (req, res) => {
  const body = req.body;
  const pid = req.params.pid;
  try {
    if (
      !body.title ||
      !body.description ||
      !body.price ||
      !body.thumbnail ||
      !body.code ||
      !body.stock ||
      !body.category ||
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      typeof body.code !== "string" ||
      typeof body.thumbnail !== "string" ||
      typeof body.price !== "number" ||
      typeof body.category !== "string" ||
      typeof body.stock !== "number"
    )
      throw new Error("Not Validate");

    await productModel.findByIdAndUpdate(pid, body);
    return res.status(200).json({ msg: "product updated" });
  } catch {
    return res
      .status(500)
      .send("Error al actualizar el producto o faltante de algun campo");
  }
};
//Borramos el producto
const deleteProduct = async (req, res) => {
  const pid = req.params.pid;
  try {
    await productModel.findByIdAndRemove(pid);
    return res.status(200).json({ msg: "product deleted" });
  } catch {
    return res.status(400).json({
      error: "product not deleted or not exist",
    });
  }
};
export { allProducts, productId, addProduct, updatedProduct, deleteProduct };
