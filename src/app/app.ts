import express from "express";
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
const CONFIG_APP = require('../data/settings.json');
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
      await dbPg.connect()
      
      await connect()
    } catch (error) {
      return error;
    }
  };
  public listen() {
    this.startServer();
    const port: Number = 8080;
    AppServer.listen(PORT || port, () => {
    Logger.info({ message: `Server on port ${CONFIG_APP[0].PORT.PORT} URL ${CONFIG_APP[0].PORT.URL} APP ${CONFIG_APP[0].PATH.APP} ` })
    });
  }
}

export default App;
