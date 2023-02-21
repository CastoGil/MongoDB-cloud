import mongoose from "mongoose";
const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
  products:[
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'productModel' },
        quantity: { type: Number, default: 0 },
    },
  ],
});
export const cartModel = mongoose.model(cartCollection, cartSchema);
