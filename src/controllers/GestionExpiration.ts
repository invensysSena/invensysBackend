import e, { Request, Response, NextFunction } from "express";
import moment from "moment";
import SubProductosModel from "../models/SubProductos.model";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";
import Todo from "../class/Notification.Todo";


class ManageExpiration {
  public async CreateExpiration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | Response | any> {
    const Token: any = req.headers.authorization;
    const veryfyToken: Array<any> | any = jwt.verify(Token, SECRET)!;
    const tokenIdUser = veryfyToken.id;

    const dataSubProduct = await SubProductosModel.find(
      {
        tokenIdUser: tokenIdUser,
      },
      { createdAt: 1, _id: 0 }
    );

    dataSubProduct.forEach((element:any) => {
      const fechaVencimiento = element.createdAt;
      const diasRestantes = Math.floor((fechaVencimiento - Date.now()) / (1000 * 60 * 60 * 24));

      if (diasRestantes <= 0) {
      new Todo().createNotificationClass(
          "Producto Vencido",
          "El producto " + element._id + " esta vencido",
          "caducidad",
          tokenIdUser

      );
      }else if(diasRestantes > 7){
        new Todo().createNotificationClass(
          "Producto por vencer",
          "El producto " + element._id + " esta por vencer",
          "caducidad",
          tokenIdUser
      );
      }
  })
  }


  public async GetExpiration() {
    const dataSubProduct = await SubProductosModel.find(
      {},
      { createdAt: 1, _id: 0 }
    );

  }
}

export default ManageExpiration;
