import { Request, Response, NextFunction } from "express";
export class AllowedModules {
  public isAllowedPermissions(req: Request, res: Response, next: NextFunction) {
    let isArrayListModules = [
      "administrador",
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
    if (isArrayListModules.includes(req.headers["role"] as string)) {
      next();
    } else {
      res.status(401).json({ message: "NO AUTHORIZATION OF MODULES" });
    }
  }
}
