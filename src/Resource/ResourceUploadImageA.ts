import { Request, Response, NextFunction } from "express";
import fs from "fs-extra";
import { conexion } from "../database/database";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; // 
import { uploadImage } from "../utils/cloudinary";
import { QueryError, RowDataPacket } from "mysql2";
class ResourceUploadImageA 
{
    public async uploadImageA(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {
          const verifyToken: Array<any> | any = jwt.verify(
            req.headers.authorization,
            SECRET
          )!;
          const { id } = verifyToken;
    
          if (id) {
            let url_imagen = null;
            let id_img = null;
    
            if (req.files?.imgData) {
              const result = await uploadImage(req.files?.imgData.tempFilePath!);
    
              url_imagen = result.secure_url;
              id_img = result.public_id;
    
              await fs.remove(req.files?.imgData.tempFilePath);
              const conn: any = await conexion.connect();
              conn.query(
                `CALL ADMIN_UPLOAD_IMG('${id}','${url_imagen}','${id_img}')`,
                (error: QueryError, rows: RowDataPacket) => {
                  if (rows) {
                    return res.status(200).json({ message: "UPLOAD_IMAGE_ADMIN" });
                  } else {
                    return res
                      .status(400)
                      .json({ message: "ERROR_UPLOAD_IMAGE_ADMIN" });
                  }
                }
              );
            } else {
              return res.status(400).json({ message: "ERROR_UPLOAD_IMAGE_ADMIN" });
            }
          } else {
            return res.status(400).json({ message: "ERROR_TOKEN_ACC" });
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_TOKEN", error });
        }
      }
}

export const resourceUploadImageA = new ResourceUploadImageA();