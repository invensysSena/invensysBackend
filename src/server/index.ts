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
mongoose.set("strictQuery", true);
const AppServer: express.Application = express();
const startServer = () => {
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

    AppServer.listen(PORT || port, () => {
      console.log("connection in the port: :", PORT);
    });

    // Here go the Routes Inicio

    AppServer.use(new RouterInicio().GetModules());

    // Here go the Routes User
    AppServer.use(new RouterUser().registerAdmin());
    AppServer.use(new RouterUser().registerUser());
    AppServer.use(new RouterUser().Login());
    AppServer.use(new RouterUser().recoveryPass());
    AppServer.use(new RouterUser().newPassword());
    AppServer.use(new RouterUser().veryfiCod());
    AppServer.use(new RouterUser().authGoogle());
    AppServer.use(new RouterUser().getDataAdmin());
    AppServer.use(new RouterUser().uploadCsvUsers());
    AppServer.use(new RouterUser().getUsersAdmin());
    AppServer.use(new RouterUser().UsersDelete());
    AppServer.use(new RouterUser().GetCountUsers());
    AppServer.use(new RouterUser().ServiseUser());
    // Here go the Routes of sydtem control users
    AppServer.use(new RouterUser().GetModuleUsers());
    AppServer.use(new RouterUser().GetPermisions());
    AppServer.use(new RouterUser().UpdateAdmin());
    AppServer.use(new RouterUser().DeleteModuleUser());
    AppServer.use(new RouterUser().SetModuleUsers());
    AppServer.use(new RouterUser().SetPermisionModule());
    AppServer.use(new RouterUser().DeletePermisionModule());
    AppServer.use(new RouterUser().GetMod());
    AppServer.use(new RouterUser().getAdminDataALL());
    AppServer.use(new RouterUser().uploadImageAdmin());
    AppServer.use(new RouterUser().UpdateAdminALL());

    // Here there are routes Products
    AppServer.use(new RouterProducts().Getproducts());
    AppServer.use(new RouterProducts().GetproductsId());
    AppServer.use(new RouterProducts().GetproductsIdCategory());
    AppServer.use(new RouterProducts().PostProduct());
    AppServer.use(new RouterProducts().PutProducts());
    AppServer.use(new RouterProducts().DeleteProduct());

    // Here there are routes Categories
    AppServer.use(new RouterCategory().GetCategory());
    AppServer.use(new RouterCategory().GetCategoryId());
    AppServer.use(new RouterCategory().CreateCategory());
    AppServer.use(new RouterCategory().PutCategory());
    AppServer.use(new RouterCategory().DeleteCategory());
    AppServer.use(new RouterCategory().GetCategoryProducts());


    // Here there are routes Providers
    AppServer.use(new RouterProviders().GetProviders());
    AppServer.use(new RouterProviders().GetProvidersId());
    AppServer.use(new RouterProviders().PostProviders());
    AppServer.use(new RouterProviders().PutProviders());
    AppServer.use(new RouterProviders().DeleteProviders());
    AppServer.use(new RouterProviders().GetProvidersProducts());
    // notification
    AppServer.use(new RouterNotification().GetNotification());
    AppServer.use(new RouterNotification().GetNotificationId());
    AppServer.use(new RouterNotification().PostcreateNotification());
    AppServer.use(new RouterNotification().DeleteNotificationId());

        // Here there are routes Providers
        AppServer.use(new RouterProviders().GetProviders())
        AppServer.use(new RouterProviders().GetProvidersId())
        AppServer.use(new RouterProviders().PostProviders())
        AppServer.use(new RouterProviders().PutProviders())
        AppServer.use(new RouterProviders().DeleteProviders())
        AppServer.use(new RouterProviders().GetProvidersProducts())
        // inventory
        // AppServer.use(new RouterInventory().GetInventory())
        // AppServer.use(new RouterInventory().GetInventoryId())
        // AppServer.use(new RouterInventory().DeleteInventoryId())
        // AppServer.use(new RouterInventory().PutInventoryId())
      
        // Here there are routes Pedidos
        AppServer.use(new RouterPedidos().GetPedidos())
        AppServer.use(new RouterPedidos().GetPedidosId())
        AppServer.use(new RouterPedidos().PostPedidos())
        AppServer.use(new RouterPedidos().PutPedidos())
        AppServer.use(new RouterPedidos().DeletePedidos())


    // inventory
    
    AppServer.use(new RouterInventory().PostInventory());
    AppServer.use(new RouterInventory().GetInventory());
    AppServer.use(new RouterInventory().DeleteInventoryId());
    AppServer.use(new RouterInventory().PutInventoryId());
    AppServer.use(new RouterInventory().UploadInsertProduct());
    AppServer.use(new RouterInventory().getSubProducts());

    // Here there are routes Pedidos

    // Here connect MongoDB
    const con = connect();
  } catch (error: any) {
    throw new Error(error);
  }
};
startServer();
