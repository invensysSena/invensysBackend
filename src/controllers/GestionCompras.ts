import { Request, Response, NextFunction } from 'express';
import { ICompras } from '../interfaces/Compras';
import SchemaCompras from '../models/Compras';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
abstract class ManageCompras{

    public async postCompras(
        req:Request, res:Response,
        next:NextFunction

    ):Promise<Request|Response|any>{
        try {

        const tokenCreated:any = req.params.id;
        const verifyToken:any = jwt.verify(tokenCreated, SECRET);
        const id_user_token = verifyToken.id;

        const {id_product, company, id_provider, quantity, total, date} = req.body.data;

        if(!id_user_token){
            return res.status(400).json({
                message: "No existe el token"
            })
        }else{
            const compra:ICompras = new SchemaCompras({
                id_user_token,
                id_product,
                company,
                id_provider ,
                quantity,
                total,
                date                              
            });

            const compras = await compra.save();
            return res.status(201).json({ok:true, message: "Compra creada",compra})
        }
            
        } catch (error) {
            return res.status(500).json({
                message: "INTERNAL_SERVER_ERROR"
            })
            
        }
    }
    public async getCompras(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {

        const tokenCreated:any = req.params.id;
        const verifyToken:any = jwt.verify(tokenCreated, SECRET);
        const id_user_token = verifyToken.id;

        if(!id_user_token){
            return res.status(400).json({
                message: "No existe el token"
            })
        }else{
            const compras = await SchemaCompras.find({id_user_token});

            return res.status(200).json({ok:true, message: "Mira vé tus compras",compras})
        }

          
        } catch (error) {
            console.log(error);
            
        }
    }

    public async getComprasById(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {

        const tokenCreated:any = req.params.id;
        const verifyToken:any = jwt.verify(tokenCreated, SECRET);
        const id_user_token = verifyToken.id;

        const {id} = req.params;

        if(!id_user_token){
            return res.status(400).json({
                message: "No existe el token"
            })
        }else{
            const compraId= await SchemaCompras.findById(id);
        }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    public async putCompras(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {

        const tokenCreated:any = req.params.id;
        const verifyToken:any = jwt.verify(tokenCreated, SECRET);
        const id_user_token = verifyToken.id;

        const {id} = req.params;

        if(!id_user_token){
            return res.status(400).json({
                message: "No existe el token"
            })
        }else{
            const compraUpdate = await SchemaCompras.findByIdAndUpdate(id, req.body.data, {new:true});

            return res.status(200).json({ok:true, message: "Compra actualizada",compraUpdate})
        }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    public async deleteCompras(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {

        const tokenCreated:any = req.params.id;
        const verifyToken:any = jwt.verify(tokenCreated, SECRET);
        const id_user_token = verifyToken.id;

        const {id} = req.params;

        if(!id_user_token){
            return res.status(400).json({
                message: "No existe el token"
            })
        }else{
            const compraDelete = await SchemaCompras.findByIdAndDelete(id);

            return res.status(200).json({ok:true, message: "Compra eliminada",compraDelete})
        }
            
        } catch (error) {
            console.log(error);
            
        }
    }


}

export default ManageCompras;
