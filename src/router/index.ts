import { Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName: any) => {
  return fileName.split(".").shift();
};
const a = fs.readdirSync(PATH_ROUTES).filter(async (file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    console.log("cargando rutas", name);

    router.use(`/${name}`, await import(`./${name}`));
  }
});

console.log({ a });

export default router;
