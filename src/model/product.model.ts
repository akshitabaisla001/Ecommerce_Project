import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>('Product', productSchema);
export default ProductModel;
