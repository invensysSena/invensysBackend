import { conexion } from "../database/database";
import { Request, Response, NextFunction } from "express";
import { QueryError, RowDataPacket, OkPacket } from 'mysql2';

import Stripe from "stripe";
class LicenceSofteareInvensys {
  public async getLicence(req: Request | any,res: Response | any,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
      const conn: any = await conexion.connect();
      conn.query(
        "SELECT * FROM licence WHERE idAdmin = ?",
        [tokenIdUser],
        (err: QueryError, result: RowDataPacket) => {
          if (err) {
            return res.json({
              ok: false,
              message: "Error al obtener la licencia",
              err,
            });
          }
          if (result.length === 0) {
            return res.json({
              ok: false,
              message: "No se encontro la licencia",
            });
          }
          return res.status(200).json({
            ok: true,
            result,
          });
        }
      );
    } catch (error) {
      return error;
    }
  }

  public async createLicence(
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ) {
    try {
      const stripe = new Stripe(
        `sk_test_51NDyJCA1OLE36MkcMDvd8eIYp7AFShFo0RhwZ2zCHwgsw2sgCZ8TsIolsVPE76cj6DRYFb4TEKdsFEUeEriirao500Mm6FILzY`,
        {
          apiVersion: "2022-11-15",
        }
      );
      const { id } = req.body;
      const { data } = req.body;

      const payment = await stripe.paymentIntents.create({
        amount: req.body.moneyPrice,
        currency: "usd",
        payment_method_types: ["card"],
        receipt_email: "ospinaortizjuandaniel351@gmail.com",
      });

      let tokenIdUser = req.user.id;
      const { licence } = req.body;
      const conn: any = await conexion.connect();
      const estado = "Activo";
      const verificado = "verificado";
      conn.query(
        `INSERT INTO licence (
          idAdmin,name_Card,licence,pago,exp_month,
          exp_year,idKey_cliente,client_secret,	object,
           estado,verificado) VALUES
         (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          tokenIdUser,data.card.brand,id,
          req.body.moneyPrice,data.card.exp_month,data.card.exp_year,
          payment.id,payment.client_secret,payment.object,
          estado,verificado,
        ],
        (err: QueryError, result: RowDataPacket) => {
          if (err) {
            return res.status(400).json({
              ok: false,message: "Error al crear la licencia",err,});
          }
          return res.status(200).json({
            ok: true,
            message: "Licencia creada con exito",
            result,
          });
        }
      );
    } catch (error) {
      return error;
    }
  }
}

export default LicenceSofteareInvensys;
