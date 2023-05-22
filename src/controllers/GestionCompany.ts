import { Request, Response, NextFunction } from "express";
import CompanySchema from "../models/modelCompany";


class ManageCompany {
    // public postCompany(req: Request | any , res: Response| any , next: NextFunction | any):Promise<Request| Response | any> {
    //     try { 
    //         const dataCompany = req.body;
    //         console.log(dataCompany);
            
    //         const newCompany = new CompanySchema(dataCompany);
    //         newCompany.save();
    //          res.status(202).json({
    //             ok: true,
    //             message: 'Compañia creada con exito',
    //             data: newCompany
    //         })
           
    //     } catch (error) {
    //        res.status(500).json({ error, message: "ERROR_SERVER" });
    //     }
    // }

    public getCompany(req: Request, res: Response) {
        res.send('getCompany');
    }

    public updateCompany(req: Request, res: Response) {
        res.send('updateCompany');
    }

    public deleteCompany(req: Request, res: Response) {
        res.send('deleteCompany');
    }
}

export default ManageCompany;