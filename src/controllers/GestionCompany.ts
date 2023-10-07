import { Request, Response, NextFunction, json } from "express";
import CompanySchema from "../models/modelCompany";
import { Logger } from "../utils/Logger";
class ManageCompany {
  public async postCompany(req: Request|any,res: Response,next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
        const {tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,telefono,pais,
          departamento,ciudad,direccion,} = req.body;

        const company = new CompanySchema({
          tokenIdUser,tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,
          telefono,pais,departamento,ciudad,direccion,});

        const CompanyCreated = await company.save();
        Logger().debug({message: `POST CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
        return res.status(200).json({
          message: "Company created successfully",
          CompanyCreated,
        });
      
    } catch (error) {
      Logger().error({error: `ERROR POST CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  }
  public async getCompany(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.user.id;
        const company = await CompanySchema.find({ tokenIdUser });
        Logger().debug({message: `GET CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
        return res.status(200).json({message: "Company created successfully",
          company,
        });
    } catch (error: any) {
      Logger().error({error: `ERROR GET CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return new Error(error);
    }
  }
  public async updateCompany(req: Request|any,res: Response,_next: NextFunction) {

    const parsedQuery = JSON.parse(req.query.q);
    const _id = parsedQuery._id;

    try {
        const {tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,telefono,pais,
          departamento,ciudad,direccion,} = req.body;
        const company = await CompanySchema.findByIdAndUpdate(_id,
          {
            tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,telefono,
            pais,departamento,ciudad,direccion,
          },
          { new: true }
          Logger().debug({message: `PUT CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
        );
        return res.status(200).json({message: "Company updated successfully",});
      
    } catch (error:any) {
      Logger().error({error: `ERROR PUT CATEGORY -> MONGOOSE ERROR: ${error}`}) 
     return res.status(500).json({ message: "Internal server error", error });
    }
  }

  public async deleteCompany(req: Request|any,res: Response,_next: NextFunction
  ): Promise<Response | Request | any> {
    try {
        const { id } = req.params;
        const company = await CompanySchema.findByIdAndDelete(id);
        Logger().debug({message: `DELETE CATEGORY -> MONGOOSE body:${req.body} params:${req.params} query:${req.query}`})
        return res.status(200).json({
          message: "Company deleted successfully",
          company,
        });
    } catch (error: any) {
      Logger().error({error: `ERROR DELETE CATEGORY -> MONGOOSE ERROR: ${error}`}) 
      return new Error(error);
    }
  }
}

export default ManageCompany;
