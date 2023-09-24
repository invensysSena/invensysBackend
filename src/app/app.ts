import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import { Logger } from "../utils/Logger"; 
import path from "path";
import { PORT } from "../config/config";
import { ServerRoutes } from "../utils/ServerRoutes";
import cors from "cors"; 
import dbPg from "../database/postgrestDB";
const AppServer: express.Application = express();
import {connect} from '../database/mongodb'
import passportmeddleware from "../middlewares/passport";
import passport from "passport";
import { SECRET } from "../config/config";
import settings from "../data/settings.json"
mongoose.set("strictQuery", true);
class App {
  public startServer = async () => {
    try {
      const urlConnectionAcceso: string = "http://localhost:3000/*";
      const statusCors: number = 200;
      const port: Number = 8080;
      AppServer.use(cors());
      AppServer.use(express.static(path.join(__dirname, "public")));
      AppServer.use(express.json());
      AppServer.use(express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));
      AppServer.use(await new ServerRoutes().Inicio());
      AppServer.use(passport.initialize());
      passport.use(passportmeddleware);
      AppServer.use(session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false
      }));
      await dbPg.connect()
      
      await connect()
    } catch (error) {
      return error;
    }
  };
  public listen() {
    this.startServer();
    const port: Number = 8080;
    AppServer.listen(settings[0].PORT.PORT, () => {
      Logger().info(`servico de invensys url:http://localhost:  port:${settings[0].PORT.PORT}`);
    });
  }
}

export default App;
