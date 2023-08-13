import e, { Request, Response, NextFunction } from "express";
import SubProductosModel from "../models/SubProductos.model";

import Todo from "../class/Notification.Todo";
class ManageExpiration {
  public async CreateExpiration(req: Request|any,_res: Response,_next: NextFunction) {
    let tokenIdUser = req.users.id; let responsable = req.users.email;
    const dataSubProduct = await SubProductosModel.find(
        {tokenIdUser: tokenIdUser,},{ createdAt: 1, _id: 0 });
    dataSubProduct.forEach((element:any) => {
      const fechaVencimiento = element.createdAt;
      const diasRestantes = Math.floor((fechaVencimiento - Date.now()) / (1000 * 60 * 60 * 24));
      if (diasRestantes <= 0) {
      new Todo().createNotificationClass(
          "Producto Vencido",
          "El producto " + element._id + " esta vencido",
          responsable,
          "caducidad",
          tokenIdUser

      );
      }else if(diasRestantes > 7){
        new Todo().createNotificationClass(
          "Producto por vencer",
          "El producto " + element._id + " esta por vencer",responsable,
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
