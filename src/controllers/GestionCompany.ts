import { Request, Response, NextFunction } from "express";
import CompanySchema from "../models/modelCompany";
class ManageCompany {
  public async postCompany(req: Request|any,res: Response,next: NextFunction) {
    try {
      let tokenIdUser = req.users.id;
        const {tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,telefono,pais,
          departamento,ciudad,direccion,} = req.body.data;

        const company = new CompanySchema({
          tokenIdUser,tipoPersona,nit,tipoIdentificacion,numero,correo,
          telefono,pais,departamento,ciudad,direccion,});

        const CompanyCreated = await company.save();

        return res.status(200).json({
          message: "Company created successfully",
          CompanyCreated,
        });
      
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  }
  public async getCompany(req: Request|any,res: Response,_next: NextFunction) {
    try {
      let tokenIdUser = req.users.id;
      if (!tokenIdUser) {
        return res.status(400).json({message: "No existe el token",});
      } else {
        const company = await CompanySchema.find({ tokenIdUser });
        return res.status(200).json({
          message: "Company created successfully",
          company,
        });
      }
    } catch (error: any) {
      return new Error(error);
    }
  }
  public async updateCompany(req: Request|any,res: Response,_next: NextFunction) {
    try {
        const { id } = req.params;
        const {tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,telefono,pais,
          departamento,ciudad,direccion,} = req.body;
        const company = await CompanySchema.findByIdAndUpdate(id,
          {
            tipoPersona,nit,tipoIdentificacion,numero,nombre,correo,telefono,
            pais,departamento,ciudad,direccion,
          },
          { new: true }
        );
        return res.status(200).json({
          message: "Company updated successfully",
          company,
        });
      
    } catch (error:any) {
      return new Error(error);
    }
  }

  public async deleteCompany(req: Request|any,res: Response,_next: NextFunction
  ): Promise<Response | Request | any> {
    try {
        const { id } = req.params;
        const company = await CompanySchema.findByIdAndDelete(id);
        return res.status(200).json({
          message: "Company deleted successfully",
          company,
        });
    } catch (error: any) {
      return new Error(error);
    }
  }
}

export default ManageCompany;
