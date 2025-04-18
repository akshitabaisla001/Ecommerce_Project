
import mongoose, { Schema, Document, Types } from 'mongoose';

interface CartProduct {
  product: Types.ObjectId; // product is a reference to a Product
  quantity: number;
}

export interface CartDocument extends Document {
  user: Types.ObjectId; // user is a reference to a User
  products: CartProduct[];
}

const cartSchema = new Schema<CartDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

const CartModel = mongoose.model<CartDocument>('Cart', cartSchema);
export default CartModel;


