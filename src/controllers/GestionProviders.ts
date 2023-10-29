import { Request, Response, NextFunction } from "express";
import ProviderSchema from "../models/modelProviders";
import { Provider } from "../interfaces/providers";
import Todo from "../class/Notification.Todo";
import { Logger } from "../utils/Logger";
abstract class ManageProviders {

  public async postProviders(req: Request|any,res: Response,_next: NextFunction) {
    try {
       let tokenIdUser = req.user.id;
       const {idCategory, name, company, email, phone, address } = req.body;

        const provider: Provider = new ProviderSchema({
        idCategory,tokenIdUser,name,company,email,phone,address,});

        const providers = await provider.save();
        await new Todo().createNotificationClass("Se creo un nuevo un proveedor",
          name,
          req.user.email,
          "provider",
          tokenIdUser
        );
        Logger().debug({ query:  "POST PRIVIDERS -> MONGOOSE"  });
        return res.status(201).json({message: "Provider created",providers});
    } catch (error) {
      Logger().debug({ query:  "ERROR PRIVIDERS -> MONGOOSE"  });
      return res.status(500).json({message: "Internal server error",error});
    }
  }
  public async getProviders(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
        const providers = await ProviderSchema.find({tokenIdUser});
        Logger().debug({ query:  "FIND ID PRIVIDERS -> MONGOOSE"  });
        return res.status(200).json(providers);
    } catch (error) {
      return res.status(500).json({message: "Internal server error",error,});
    }
  }
  public async getProvidersId(req: Request|any,res: Response,_next: NextFunction) {
    try {
        const { id } = req.params;
        const provider = await ProviderSchema.findById(id);
        return res.status(200).json(provider);
    } catch (error) {
      return res.status(500).json({message: "Internal server error",});
    }
  }
  public async putProviders(req: Request|any,res: Response,_next: NextFunction){
    try {
      const parsedQuery = JSON.parse(req.query.q);
      const _id = parsedQuery.id;
      const { name, company, email, phone, address } = req.body;
      const provider: Provider | any = {
      name,company,email,phone,address,};
      const providerUpdated = await ProviderSchema.findByIdAndUpdate(_id,provider,{ new: true });
      return res.status(200).json(providerUpdated);
    } catch (error) {
      return res.status(500).json({message: "Internal server error",error,});
    }
  }
  public async deleteProviders(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
      let responsable = req.user.email;
      const parsedQuery = JSON.parse(req.query.q);
      const _id = parsedQuery.id;
         await new Todo().createNotificationClass(
           "Se Elimino  un proveedor","Se elimino con exito", responsable,"provider",
           tokenIdUser);
        const providerDeleted = await ProviderSchema.findByIdAndDelete(_id);
        return res.status(200).json(providerDeleted);
    } catch (error) {
      return res.status(500).json({message: "Internal server error",});
    }
  }
  public async getProvidersProducts(req: Request|any,res: Response,_next: NextFunction) {
    try {
        const { id } = req.params;
        const provider = await ProviderSchema.find({ productIdCategory: id });
        return res.status(200).json(provider);
    } catch (error) {
      return res.status(400).json({message: "Internal server error",});
    }
  }
}

export default ManageProviders;
