import { Request, Response, NextFunction } from "express";
export class AllowedModules {
  public static modules: string[] = [
    "superAdmin",
    "bodega",
    "categorias",
    "usuario",
    "notificaciones",
    "producto",
    "proveedor",
    "pedidos",
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
    "LicenceSoftware/state",
  ];

  public static isAllowedModule(
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    const module = req.headers["module"];
        this.modules.find((allowedModule: string) => allowedModule === module);
        if (module) {
              next();
        }
            return res.status(401).json({ error: "ERROR MODULES ACESS DENIED  " });
  }
}
