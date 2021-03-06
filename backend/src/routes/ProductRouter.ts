import { uploadOne } from "./../middleware";
import { author } from "../middleware";
import { BaseRouter } from "./BaseRouter";
import productService from "../services/ProductService";
import { authen } from "../middleware";
import { validate } from "../middleware";
import { addProduct } from "../validations";
import { updateProduct } from "../validations";
import { deleteProduct } from "../validations";
import { searchProduct } from "../validations";

class ProductRouter extends BaseRouter {
  private _service = productService;
  constructor() {
    super();
    this.init();
  }
  protected init() {
    this.router.post(
      "/addproduct",
      uploadOne,authen,author,
      validate(addProduct),
      this._service.addProduct
    );
    this.router.post(
      "/updateproduct",
      validate(updateProduct),
      this._service.updateProduct
    );
    this.router.post(
      "/deleteproduct",authen,author,
      validate(deleteProduct),
      this._service.deleteProduct
    );
    this.router.post(
      "/searchproduct",
      validate(searchProduct),
      this._service.searchProduct
    );
    this.router.get("/getallproduct", this._service.getAllProducts);
    this.router.get("/getproductbyid/:_id", this._service.getProductById);
  }
}

export = new ProductRouter().router;
