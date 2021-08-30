import { Product } from "./../model/ProductModel";
import { IProduct } from "./../interfaces/ProductInterface";
import { Types } from "mongoose";

class ProductRepository {
  async getAllProducts(): Promise<IProduct[]> {
    try {
      let allProducts: IProduct[] = await Product.find();
      return allProducts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findProductbyName(productName: string): Promise<IProduct> {
    try {
      let abc = new RegExp(productName);
      let productFound = await Product.find({
        name: abc,
      }).select("_id  name price img category description rating numReviews");
      return productFound;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findProductbyId(productId: any): Promise<IProduct> {
    try {
      let productFound = await Product.findOne({
        _id: productId,
      }).select("_id  name price img category description rating numReviews");
      return productFound;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(product: IProduct): Promise<IProduct> {
    try {
      let newProduct = new Product({
        _id: Types.ObjectId(),
        ...product,
      });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateProduct(product: IProduct): Promise<IProduct> {
    try {
      await Product.updateOne({ _id: product._id }, { ...product });
      return Product.findOne({ _id: product._id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductbyId(productId: number): Promise<boolean> {
    try {
      return await Product.findOneAndDelete({ _id: productId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductbyName(productName: string): Promise<boolean> {
    try {
      return await Product.findOneAndDelete({ name: productName });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export = new ProductRepository();
