import mongoose, { Document, Schema, Types } from 'mongoose';

interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  products: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<OrderDocument>('Order', orderSchema);
export default OrderModel;
