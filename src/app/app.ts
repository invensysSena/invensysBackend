import express from "express";
import mongoose from "mongoose";
import path from "path";
import { PORT } from "../config/config";
import cors from "cors";
import RouterUser from "../router/router";
import RouterProducts from "../router/router.products";
import RouterCategory from "../router/router.category";
import RouterProviders from "../router/router.providers";
import RouterInicio from "../router/router.inicio";
import RouterNotification from "../router/router.Notification";
import RouterInventory from "../router/router.inventary";
import { connect } from "../database/mongodb";
import RouterPedidos from "../router/router.pedidos";
import { getLogger } from "nodemailer/lib/shared";
import { ServerRoutes } from "../utils/ServerRoutes";
mongoose.set("strictQuery", true);
const AppServer: express.Application = express();
import { conexion } from "../database/database";
import stripe from "stripe";
class App {
  public startServer = async () => {
    try {


      const urlConnectionAcceso: string = "http://localhost:3000/*";
      const statusCors: number = 200;
      const port: Number = 8080;
      AppServer.use(
        cors({
          origin: [urlConnectionAcceso, "http://localhost:3000"],
          methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
          optionsSuccessStatus: statusCors,
        })
      );
      AppServer.use(express.static(path.join(__dirname, "public")));
      AppServer.use(express.json());
      AppServer.use(express.urlencoded({ extended: true }));
      AppServer.use(await new ServerRoutes().Inicio());
      await connect();
    } catch (error: any) {
      throw new Error(error);
    }
  };
  public listen() {
    this.startServer();
    conexion.connect();
    const port: Number = 8080;
    AppServer.listen(PORT || port, () => {
    });
  }
}

export default App;
