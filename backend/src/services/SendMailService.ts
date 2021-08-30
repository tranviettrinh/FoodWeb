import { IService } from "./ServiceInterface";
import { Request, Response, NextFunction } from "express";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
// import express from "express";

class SendMailService implements IService {
  defaultMethod(req: Request, res: Response, next: NextFunction) {}

  private CLIENT_ID = process.env.CLIENT_ID;
  private CLIENT_SECRET = process.env.CLIENT_SECRET;
  private REDIRECT_URI = "https://developers.google.com/oauthplayground";
  private REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  private oAuth2Client = new google.auth.OAuth2(
    this.CLIENT_ID,
    this.CLIENT_SECRET,
    this.REDIRECT_URI
  );

  sendMail = async (req: Request, res: Response, next: NextFunction) => {
    let data = req.body;

    var cartMap = data.cartItems.map(
      (item) =>
        `<li>
        <div className="row">
          <div className="min-30"><b>Sản phẩm: </b>${item.name}</div>
          <div><b>Số lượng khách mua: </b>${item.sl}</div>
          <div><b>Giá sản phẩm: </b>${item.price} VND</div>
          <div><b>Thành tiền: </b>${item.price * item.sl} VND</div>
        </div>
      </li>`
    );

    var total = data.cartItems.reduce((a, c) => a + c.sl, 0);
    var totalPrice = data.cartItems.reduce((a, c) => a + c.price * c.sl, 0);

    var html = `<div><h1>Thông tin đơn hàng mới: </h1> <div>Tên khách hàng: ${data.name}</div><div>Số điện thoại khách hàng: ${data.phone}</div><div>Địa chỉ khách hàng: ${data.address}</div><div>`;
    for (let item of cartMap) {
      html += item;
    }
    html += "</div></div>";
    html += `<h3>Tổng đơn hàng: ( ${total} sản phẩm) : ${totalPrice} VND</h3>`;

    this.oAuth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });

    try {
      const accessToken = await this.oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "facebook.your.protect.services@gmail.com",
          clientId: this.CLIENT_ID,
          clientSecret: this.CLIENT_SECRET,
          refreshToken: this.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: "FoodWeb <facebook.your.protect.services@gmail.com>",
        to: "duongitachi7@gmail.com, tienboi1995@gmail.com",
        subject: "Bạn có đơn hàng mới",
        text: "",
        html,
      };

      const result = await transport.sendMail(mailOptions);
      res.status(200).json({
        success: true,
        result: result,
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        result: null,
        error: error.message,
      });
    }
  };

  // sendMail()
  //   .then((result) => console.log("Email sent...", result))
  //   .catch((error) => console.log(error.message));
}

export = new SendMailService();
