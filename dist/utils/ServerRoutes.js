"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("../router/router"));
const router_products_1 = __importDefault(require("../router/router.products"));
const router_category_1 = __importDefault(require("../router/router.category"));
const router_providers_1 = __importDefault(require("../router/router.providers"));
const router_inicio_1 = __importDefault(require("../router/router.inicio"));
const router_Notification_1 = __importDefault(require("../router/router.Notification"));
const router_inventary_1 = __importDefault(require("../router/router.inventary"));
const router_pedidos_1 = __importDefault(require("../router/router.pedidos"));
const router_compras_1 = __importDefault(require("../router/router.compras"));
const router_company_1 = __importDefault(require("../router/router.company"));
const router_InventaryGeneral_1 = __importDefault(require("../router/router.InventaryGeneral"));
const router_expiration_1 = __importDefault(require("../router/router.expiration"));
const AppServer = (0, express_1.default)();
class ServerRoutes {
    Inicio() {
        return __awaiter(this, void 0, void 0, function* () {
            AppServer.use(new router_inicio_1.default().GetModules());
            // Here go the Routes User
            AppServer.use(new router_1.default().registerAdmin());
            AppServer.use(new router_1.default().registerUser());
            AppServer.use(new router_1.default().Login());
            AppServer.use(new router_1.default().recoveryPass());
            AppServer.use(new router_1.default().newPassword());
            AppServer.use(new router_1.default().veryfiCod());
            AppServer.use(new router_1.default().authGoogle());
            AppServer.use(new router_1.default().getDataAdmin());
            AppServer.use(new router_1.default().uploadCsvUsers());
            AppServer.use(new router_1.default().getUsersAdmin());
            AppServer.use(new router_1.default().UsersDelete());
            AppServer.use(new router_1.default().GetCountUsers());
            AppServer.use(new router_1.default().ServiseUser());
            AppServer.use(new router_1.default().licenceRouter());
            AppServer.use(new router_1.default().getLicence());
            AppServer.use(new router_1.default().updateAdminPass());
            AppServer.use(new router_1.default().updateEmailUser());
            AppServer.use(new router_1.default().updatePassUser());
            // Here go the Routes of sydtem control users
            AppServer.use(new router_1.default().GetModuleUsers());
            AppServer.use(new router_1.default().GetPermisions());
            AppServer.use(new router_1.default().UpdateAdmin());
            AppServer.use(new router_1.default().DeleteModuleUser());
            AppServer.use(new router_1.default().SetModuleUsers());
            AppServer.use(new router_1.default().SetPermisionModule());
            AppServer.use(new router_1.default().DeletePermisionModule());
            AppServer.use(new router_1.default().GetMod());
            AppServer.use(new router_1.default().getAdminDataALL());
            AppServer.use(new router_1.default().uploadImageAdmin());
            AppServer.use(new router_1.default().UpdateAdminALL());
            // Here there are routes Products
            AppServer.use(new router_products_1.default().Getproducts());
            AppServer.use(new router_products_1.default().GetproductsId());
            AppServer.use(new router_products_1.default().GetproductsIdCategory());
            AppServer.use(new router_products_1.default().PostProduct());
            AppServer.use(new router_products_1.default().PutProducts());
            AppServer.use(new router_products_1.default().DeleteProduct());
            // Here there are routes Categories
            AppServer.use(new router_category_1.default().GetCategory());
            AppServer.use(new router_category_1.default().GetCategoryId());
            AppServer.use(new router_category_1.default().CreateCategory());
            AppServer.use(new router_category_1.default().PutCategory());
            AppServer.use(new router_category_1.default().DeleteCategory());
            AppServer.use(new router_category_1.default().GetCategoryProducts());
            // Here there are routes Providers
            AppServer.use(new router_providers_1.default().GetProviders());
            AppServer.use(new router_providers_1.default().GetProvidersId());
            AppServer.use(new router_providers_1.default().PostProviders());
            AppServer.use(new router_providers_1.default().PutProviders());
            AppServer.use(new router_providers_1.default().DeleteProviders());
            AppServer.use(new router_providers_1.default().GetProvidersProducts());
            // notification
            AppServer.use(new router_Notification_1.default().GetNotification());
            AppServer.use(new router_Notification_1.default().GetNotificationId());
            AppServer.use(new router_Notification_1.default().PostcreateNotification());
            AppServer.use(new router_Notification_1.default().DeleteNotificationId());
            AppServer.use(new router_Notification_1.default().DeleteNotificationEstado());
            // Here there are routes Providers
            AppServer.use(new router_providers_1.default().GetProviders());
            AppServer.use(new router_providers_1.default().GetProvidersId());
            AppServer.use(new router_providers_1.default().PostProviders());
            AppServer.use(new router_providers_1.default().PutProviders());
            AppServer.use(new router_providers_1.default().DeleteProviders());
            AppServer.use(new router_providers_1.default().GetProvidersProducts());
            // Here there are routes Pedidos
            AppServer;
            AppServer.use(new router_pedidos_1.default().GetPedidos());
            AppServer.use(new router_pedidos_1.default().GetPedidosId());
            AppServer.use(new router_pedidos_1.default().PostPedidos());
            AppServer.use(new router_pedidos_1.default().PutPedidos());
            AppServer.use(new router_pedidos_1.default().DeletePedidos());
            // inventory
            AppServer.use(new router_inventary_1.default().PostInventory());
            AppServer.use(new router_inventary_1.default().GetInventory());
            AppServer.use(new router_inventary_1.default().DeleteInventoryId());
            AppServer.use(new router_inventary_1.default().PutInventoryId());
            AppServer.use(new router_inventary_1.default().UploadInsertProduct());
            AppServer.use(new router_inventary_1.default().getSubProducts());
            AppServer.use(new router_inventary_1.default().postTranslateProducts());
            AppServer.use(new router_inventary_1.default().getTranslateProducts());
            AppServer.use(new router_inventary_1.default().UpdateSubProducts());
            AppServer.use(new router_inventary_1.default().UpdateEmailBodega());
            AppServer.use(new router_inventary_1.default().GetAllSubProducts());
            AppServer.use(new router_inventary_1.default().DisminucionUnidades());
            // compras
            AppServer.use(new router_compras_1.default().PostComprasRouter());
            AppServer.use(new router_compras_1.default().GetComprasRouter());
            AppServer.use(new router_compras_1.default().GetComprasFvRouter());
            // company
            AppServer.use(new router_company_1.default().PostCompany());
            AppServer.use(new router_company_1.default().GetCompany());
            AppServer.use(new router_company_1.default().UpdateCompany());
            AppServer.use(new router_company_1.default().DeleteCompany());
            // Inventary General
            AppServer.use(new router_InventaryGeneral_1.default().PostInventaryGeneral());
            AppServer.use(new router_InventaryGeneral_1.default().GetInventaryGeneral());
            AppServer.use(new router_InventaryGeneral_1.default().PutInventaryGeneral());
            AppServer.use(new router_InventaryGeneral_1.default().DeleteInventaryGeneral());
            // Expiration
            AppServer.use(new router_expiration_1.default().PostCaducidad());
            AppServer.use(new router_expiration_1.default().GetCaducidad());
            return AppServer;
        });
    }
}
exports.ServerRoutes = ServerRoutes;
//# sourceMappingURL=ServerRoutes.js.map