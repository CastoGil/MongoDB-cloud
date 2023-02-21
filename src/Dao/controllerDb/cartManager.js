import { productModel } from "../models/products.js";
import { cartModel } from "../models/carts.js";
///Creando un nuevo Carrito
const newCart = async (req, res) => {
  try {
    const createCart = new cartModel();
    await createCart.save();
    return res.status(200).json({ msg: "Cart created", createCart });
  } catch {
    return res.status(400).json({
      msg: `error cart not created`,
    });
  }
};
//Mostramos los productos del carrito seleccionado
const cartIdproduct = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartModel.findById(cid);
    return res.status(200).json({
      cart,
    });
  } catch {
    return res.status(400).json({
      error: "cart not exist",
    });
  }
};
///agregando productos al carrito seleccionado
const idCartIdProductAdd = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try {
    const cartCid = await cartModel.findById(cid);
    const productId = await productModel.findById(pid);

    // Verificar si el producto ya está en el carrito
    const productInCarIndex = cartCid.products.findIndex(
      (product) => product.id === pid
    );
    //si ya se encuentra le sumo 1
    if (productInCarIndex !== -1) {
      cartCid.products[productInCarIndex].quantity += 1;
    } else {
      cartCid.products.push({ _id: productId, quantity: 1 });
    }
    await cartCid.save();
    return res.status(200).json({ msg: "product added", cartCid });
  } catch {
    return res.status(400).json({
      msg: "the product could not be added",
    });
  }
};
export { newCart, cartIdproduct, idCartIdProductAdd };
