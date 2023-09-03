import { Router } from "express";
import fs from "fs";
import path from "path";

const router: Router = Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName: string) => {
  return fileName.split(".").shift();
};
const a = fs.readdirSync(PATH_ROUTES).filter(async (file) => {
  const name = removeExtension(file);
  if (name !== "index") {

    router.use(`/${name}`, await import(`./${name}`));
  }
});


export default router;
