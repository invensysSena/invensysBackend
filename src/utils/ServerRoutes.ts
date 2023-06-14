import express, { Router } from "express";
import RouterUser from "../router/router";
import RouterProducts from "../router/router.products";
import RouterCategory from "../router/router.category";
import RouterProviders from "../router/router.providers";
import RouterInicio from "../router/router.inicio";
import RouterNotification from "../router/router.Notification";
import RouterInventory from "../router/router.inventary";
import RouterPedidos from "../router/router.pedidos";
import RouterCompras from "../router/router.compras";
import RouterCompany from "../router/router.company";
import RouterInventaryGeneral from "../router/router.InventaryGeneral";
import ExpirationRouter from "../router/router.expiration";
const AppServer: express.Application = express();
export class ServerRoutes {
  public async Inicio(): Promise<any> {
    AppServer.use(new RouterInicio().GetModules());

    // Here go the Routes User

    AppServer.use(new RouterUser().registerAdmin());
    AppServer.use(new RouterUser().RouterPrincipal());
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
    AppServer.use(new RouterUser().licenceRouter());
    AppServer.use(new RouterUser().getLicence());
    AppServer.use(new RouterUser().updateAdminPass());
    AppServer.use(new RouterUser().updateEmailUser());
    AppServer.use(new RouterUser().updatePassUser());
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
    AppServer.use(new RouterNotification().DeleteNotificationEstado());

    // Here there are routes Providers
    AppServer.use(new RouterProviders().GetProviders());
    AppServer.use(new RouterProviders().GetProvidersId());
    AppServer.use(new RouterProviders().PostProviders());
    AppServer.use(new RouterProviders().PutProviders());
    AppServer.use(new RouterProviders().DeleteProviders());
    AppServer.use(new RouterProviders().GetProvidersProducts());

    // Here there are routes Pedidos
    AppServer;
    AppServer.use(new RouterPedidos().GetPedidos());
    AppServer.use(new RouterPedidos().GetPedidosId());
    AppServer.use(new RouterPedidos().PostPedidos());
    AppServer.use(new RouterPedidos().PutPedidos());
    AppServer.use(new RouterPedidos().DeletePedidos());

    // inventory

    AppServer.use(new RouterInventory().PostInventory());
    AppServer.use(new RouterInventory().GetInventory());
    AppServer.use(new RouterInventory().DeleteInventoryId());
    AppServer.use(new RouterInventory().PutInventoryId());
    AppServer.use(new RouterInventory().UploadInsertProduct());
    AppServer.use(new RouterInventory().getSubProducts());
    AppServer.use(new RouterInventory().postTranslateProducts());
    AppServer.use(new RouterInventory().getTranslateProducts());
    AppServer.use(new RouterInventory().UpdateSubProducts());
    AppServer.use(new RouterInventory().UpdateEmailBodega());
    AppServer.use(new RouterInventory().GetAllSubProducts());
    AppServer.use(new RouterInventory().DisminucionUnidades());
    // compras
    AppServer.use(new RouterCompras().PostComprasRouter());
    AppServer.use(new RouterCompras().GetComprasRouter());
    AppServer.use(new RouterCompras().GetComprasFvRouter());

    // company
    AppServer.use(new RouterCompany().PostCompany());
    AppServer.use(new RouterCompany().GetCompany());
    AppServer.use(new RouterCompany().UpdateCompany());
    AppServer.use(new RouterCompany().DeleteCompany());

    // Inventary General

    AppServer.use(new RouterInventaryGeneral().PostInventaryGeneral());
    AppServer.use(new RouterInventaryGeneral().GetInventaryGeneral());
    AppServer.use(new RouterInventaryGeneral().PutInventaryGeneral());
    AppServer.use(new RouterInventaryGeneral().DeleteInventaryGeneral());

    // Expiration
    AppServer.use(new ExpirationRouter().PostCaducidad());
    AppServer.use(new ExpirationRouter().GetCaducidad());

    return AppServer;
  }
}
