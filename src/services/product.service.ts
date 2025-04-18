import ProductModel from '../model/product.model';

export const getAllProducts = async () => {
  return await ProductModel.find();
};

export const getProductById = async (id: string) => {
  return await ProductModel.findById(id);
};

export const createProduct = async (data: any) => {
  return await ProductModel.create(data);
};

export const updateProduct = async (id: string, data: any) => {
  return await ProductModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await ProductModel.findByIdAndDelete(id);
};
