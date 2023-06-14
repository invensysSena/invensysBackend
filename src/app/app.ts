import express from "express";
import mongoose from "mongoose";
import path from "path";
import { PORT } from "../config/config";
import cors from "cors";
import { connect } from "../database/mongodb";
import { ServerRoutes } from "../utils/ServerRoutes";
mongoose.set("strictQuery", true);
const AppServer: express.Application = express();
import { conexion } from "../database/database";
class App {
  public startServer = async () => {
    try {
      const urlConnectionAcceso: string = "http://localhost:3000/*";
      const statusCors: number = 200;
      const port: Number = 8080;
      AppServer.use(
        cors({origin:"*"})
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
