import sendMailService from "../services/SendMailService";
import { BaseRouter } from "./BaseRouter";

class MailRouter extends BaseRouter {
  private _service = sendMailService;
  constructor() {
    super();
    this.init();
  }
  protected init() {
    this.router.post("/sendmail", this._service.sendMail);
  }
}

export = new MailRouter().router;
