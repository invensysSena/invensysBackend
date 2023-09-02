import { Request, Response, NextFunction } from "express";
import fs from "fs-extra";
import { uploadImage } from "../utils/cloudinary";
import settings from "../data/settings.json";
import { queryData } from "../secure/DbQuery";
let app_settings = settings[0]
class ResourceUploadImageA 
{
    public async uploadImageA(req: Request | any,res: Response,_next: Partial<NextFunction>) {
        try {

            let imgurl = null;
            let imgid = null;
            if (req.files?.imgData) {
              const result = await uploadImage(req.files?.imgData.tempFilePath!);
              imgurl = result.secure_url;
              imgid = result.public_id;
              let condition = Object.keys({idadmin:req.users.id,})
              await fs.remove(req.files?.imgData.tempFilePath);

                let response =  await queryData.QueryUpdate(app_settings.METHOD.PUT,app_settings.schema,app_settings.TABLES.ADMIN,
                Object.keys({imgurl,imgid}),Object.values({imgurl,imgid,idadmin:req.users.id,}),['WHERE'],condition)
              
               return res.status(200).json({ message: "OK", response });

          } else {
            return res.status(400).json({ message: "ERROR_TOKEN_ACC" });
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_TOKEN", error });
        }
      }
}

export const resourceUploadImageA = new ResourceUploadImageA();