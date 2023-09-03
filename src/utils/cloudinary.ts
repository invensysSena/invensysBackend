import {v2 as cloudinary } from "cloudinary"
import { claudinar_Name,
        claudinarySecret,
        cludinaryKey 
       
} from "../config/config"
cloudinary.config({ 
  cloud_name: claudinar_Name,
  api_key: cludinaryKey, 
  api_secret: claudinarySecret,
  secure: true
});
export async function uploadImage(filePath:string) {
return  await cloudinary.uploader.upload(filePath,{
  folder: "stored",
  equalize: true,
  quality:"auto",
  transformation: [
      {gravity: "face", height: 400, width: 400, crop: "crop"},
      {radius: "max"},
      {width: 200, crop: "scale"}
      ]})}

export async function deleteImage(publicId:string){

 return  await cloudinary.uploader?.destroy(publicId)!
  
}