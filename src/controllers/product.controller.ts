import { Request, Response } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service';

export const fetchProducts = async (_req: Request, res: Response): Promise<void> => {
  const products = await getAllProducts();
  res.status(200).json(products);
};

export const fetchProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await getProductById(req.params.id);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.status(200).json(product);
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const newProduct = await createProduct(req.body);
  res.status(201).json(newProduct);
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
  const updatedProduct = await updateProduct(req.params.id, req.body);
  if (!updatedProduct) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.status(200).json(updatedProduct);
};

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
  const deletedProduct = await deleteProduct(req.params.id);
  if (!deletedProduct) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.status(200).json({ message: 'Product deleted' });
};
