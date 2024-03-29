import { Request, Response, NextFunction } from "express";
import fs from "fs-extra";
import { uploadImage } from "../utils/cloudinary";
import settings from "../data/settings.json";
import { queryData } from "../secure/DbQuery";
let app_settings = settings[0]
class ResourceUploadImageA 
{
    public async uploadImageA(req: Request | any,res: Response,_next: Partial<NextFunction>) {
      console.log(req.files,"fff")
        try {

            let imgurl = null;
            let imgid = null;
            if (req.files?.file) {
              const result = await uploadImage(req.files?.file.tempFilePath!);
              imgurl = result.secure_url;
              imgid = result.public_id;
              let condition = Object.keys({idadmin:req.user.id,})
              let response =  await queryData.QueryUpdate(app_settings.METHOD.PUT,app_settings.schema,app_settings.TABLES.ADMIN,
                Object.keys({imgurl,imgid}),Object.values({imgurl,imgid,idadmin:req.user.id,}),['WHERE'],condition,req)
                await fs.remove(req.files?.file.tempFilePath);
              
               return res.status(200).json({ message: "OK", response });

          } else {
            return res.status(400).json({ message: "ERROR_DATA",});
          }
        } catch (error) {
          return res.status(400).json({ message: "ERROR_DATA", error });
        }
      }
}

export const resourceUploadImageA = new ResourceUploadImageA();