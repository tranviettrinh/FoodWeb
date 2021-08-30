import { BaseRouter } from "./BaseRouter";
import cartService from "../services/CartService";
import { validate } from "../middleware";
import { addAndUpdateCart } from "../validations";
import { deleteCart } from "../validations";
import { getAllCart } from "../validations";

class CartRouter extends BaseRouter {
  private _service = cartService;
  constructor() {
    super();
    this.init();
  }
  protected init() {
    this.router.post(
      "/addandupdatecart",
      validate(addAndUpdateCart),
      this._service.addAndUpdateCart
    );
    this.router.post(
      "/deletecart",
      validate(deleteCart),
      this._service.deleteCart
    );
    this.router.post(
      "/getallcart",
      validate(getAllCart),
      this._service.getAllCart
    );
  }
}

export = new CartRouter().router;
