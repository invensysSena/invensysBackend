import { Request, Response, NextFunction } from "express";
import CompanySchema from "../models/modelCompany";
import { SECRET } from "../config/config";
import jwt from "jsonwebtoken";


class ManageCompany {
public async postCompany(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
    try {
      const tokenCreated: any = req.headers["authorization"];
      const verifyToken: any = jwt.verify(tokenCreated, SECRET);
      const tokenIdUser = verifyToken.id;
      console.log(tokenIdUser);
      
      if (!tokenIdUser) {
        return res.status(400).json({
          message: "No existe el token",
        });
      } else {
        const {
          
            tipoPersona, 
            nit,
            tipoIdentificacion,
            numero,
            nombre,
            correo,
            telefono,
            pais,
            departamento,
            ciudad,
            direccion,
        } = req.body.data;
        const company = new CompanySchema({
             tokenIdUser,
            tipoPersona,
            nit,
            tipoIdentificacion,
            numero,
            nombre,
            correo,
            telefono,
            pais,
            departamento,
            ciudad,
            direccion
        });
       const CompanyCreated = await company.save();
       console.log(company);
       
        return res.status(200).json({
          message: "Company created successfully",
          CompanyCreated,
        });
      }
    } catch (error) {
      
      return res.status(500).json({
        message: "Internal server error",error,
      });
    }

   }

public async getCompany(req: Request , res: Response, next: NextFunction):Promise<Request| Response | any> {
        
        try {
            const tokenCreated: any = req.headers["authorization"];
            const verifyToken: any = jwt.verify(tokenCreated, SECRET);
            const tokenIdUser = verifyToken.id;
            if (!tokenIdUser) {
              return res.status(400).json({
                message: "No existe el token",
              });
            } else {
                const company = await CompanySchema.find({tokenIdUser});
                return res.status(200).json({
                    message: "Company created successfully",
                    company,
                  });
            }  
        } catch (error:any) {
            return new Error(error);
        } 

    }

    public async updateCompany(req: Request, res: Response, next: NextFunction): Promise<Response | Request | any> {
        try {
            const tokenCreated: any = req.headers["x-id-token"];
            const verifyToken: any = jwt.verify(tokenCreated, SECRET);
            const tokenIdUser = verifyToken.id;
            if (!tokenIdUser) {
              return res.status(400).json({
                message: "No existe el token",
              });
            } else {
                const { id } = req.params;
                const {
                    tipoPersona, 
                    nit,
                    tipoIdentificacion,
                    numero,
                    nombre,
                    correo,
                    telefono,
                    pais,
                    departamento,
                    ciudad,
                    direccion,
                } = req.body;
                const company = await CompanySchema.findByIdAndUpdate(id, {
                    tipoPersona, 
                    nit,
                    tipoIdentificacion,
                    numero,
                    nombre,
                    correo,
                    telefono,
                    pais,
                    departamento,
                    ciudad,
                    direccion
                    
                },{new: true});
                return res.status(200).json({
                    message: "Company updated successfully",
                    company,
                  });
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    public async deleteCompany(req: Request, res: Response , next: NextFunction) : Promise<Response | Request | any> {
        
        try {
            const tokenCreated: any = req.headers["x-id-token"];
            const verifyToken: any = jwt.verify(tokenCreated, SECRET);
            const tokenIdUser = verifyToken.id;
            if (!tokenIdUser) {
              return res.status(400).json({
                message: "No existe el token",
              });
            } else {
                const { id } = req.params;
                const company = await CompanySchema.findByIdAndDelete(id);
                return res.status(200).json({
                    message: "Company deleted successfully",
                    company,
                  });
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default ManageCompany;