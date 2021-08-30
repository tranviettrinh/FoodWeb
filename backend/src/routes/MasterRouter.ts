import { BaseRouter } from "./BaseRouter";
import testRouter from "./TestRouter";
import userRouter from "./UserRouter";
import productRouter from "./ProductRouter";
import ratingRouter from "./RatingRouter";
import cartRouter from "./CartRouter";
import express from "express";
import mailRouter from "./MailRouter";

class MasterRouter extends BaseRouter {
  constructor() {
    super();
    this.config();
    this.init();
  }
  protected init() {
    this.router.use("/home", testRouter);
    this.router.use("/user", userRouter);
    this.router.use("/product", productRouter);
    this.router.use("/rating", ratingRouter);
    this.router.use("/cart", cartRouter);
    this.router.use("/mail", mailRouter);
  }

  private config() {
    this.router.use(express.json());
    this.router.use(
      express.urlencoded({
        extended: true,
      })
    );
  }
}

export = new MasterRouter().router;
