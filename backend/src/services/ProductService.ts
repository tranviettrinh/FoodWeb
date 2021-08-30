import { IProduct } from "./../interfaces/ProductInterface";
import { IService } from "./ServiceInterface";
import { Request, Response, NextFunction } from "express";
import productRepository from "../repositories/ProductRepository";
import pick from "../util/Pick";

class ProductService implements IService {
  private _productRepository = productRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {}

  addProduct = async (req: Request, res: Response, next: NextFunction) => {
    let product = req.body;
    let file = req.file;
    try {
      product.img = "/images/" + file.filename;
      let productCreated = await this._productRepository.addProduct(product);
      productCreated = pick(productCreated, [
        "name",
        "price",
        "img",
        "category",
        "description",
        "rating",
        "numReviews",
      ]);
      res.status(200).json({
        success: true,
        result: productCreated,
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: "Can not add product this time, please check again",
      });
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    let product = req.body;
    try {
      let productUpdated = await this._productRepository.updateProduct(product);
      if (productUpdated) {
        res.status(200).json({
          success: true,
          result: productUpdated,
          error: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: "Can't update product this time, please check later",
      });
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    let product = req.body;
    try {
      let productDeleted = await this._productRepository.removeProductbyId(
        product._id
      );
      if (productDeleted) {
        res.status(200).json({
          success: true,
          result: productDeleted,
          error: null,
        });
      } else {
        res.status(500).json({
          success: false,
          result: null,
          error: "Can't del product this time, please check later",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: "Can't delete product this time, please check later",
      });
    }
  };

  searchProduct = async (req: Request, res: Response, next: NextFunction) => {
    let productText = req.body.text;
    try {
      let productsSearched: IProduct[] = [];
      let nameFound = await this._productRepository.findProductbyName(
        productText
      );
      if (nameFound) {
        productsSearched.push(nameFound);
      }
      if (productsSearched.length > 0) {
        res.status(200).json({
          success: true,
          result: productsSearched,
          error: null,
        });
      } else {
        res.status(500).json({
          success: false,
          result: "No product found",
          error: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: "Can't search product this time, please check later",
      });
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let productId = req.params._id;
      console.log(productId);
      let productFound: IProduct =
        await this._productRepository.findProductbyId(productId);
      if (!productFound) {
        res.status(500).json({
          success: false,
          result: null,
          error: "Product not found",
        });
      } else {
        res.status(200).json({
          success: true,
          result: productFound,
          error: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: "Product not found",
      });
    }
  };

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let allProducts: IProduct[] =
        await this._productRepository.getAllProducts();
      if (this.getAllProducts) {
        res.status(200).json({
          success: true,
          result: allProducts,
          error: null,
        });
      } else {
        res.status(500).json({
          success: false,
          result: null,
          error: "There's no product in database",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: "Can't get all products this time, please check later",
      });
    }
  };
}

export = new ProductService();
