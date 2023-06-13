import { Request, Response, NextFunction } from "express";
export class AllowedModules {
  public isAllowedPermissions(req: Request, res: Response, next: NextFunction) {
    let isArrayListModules = [
      "superAdmin",
      "bodega",
      "categorias",
      "usuario",
      "notificaciones",
      "producto",
      "proveedor",
      "pedidos",
      "inicio",
      "analityc",
      "perfil",
      "dasboard",
      "shope",
      "config",
      "ayuda",
      "report",
      "start",
      "venta",
      "inventoryGeneral",
      "trae",
      "licenceSoftware",
    ];
    if (isArrayListModules.includes(req.headers["isallowedaccess"] as string)) {
      next();
    } else {
      res.status(401).json({ message: "NO AUTHORIZATION OF MODULES" });
    }
  }
}
