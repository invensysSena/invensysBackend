
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const tokenCreate: string = req.headers.authorization!;
    const veryfyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
    const tokenIdUser = veryfyToken.id;

    if (!tokenIdUser) {
        return res.json({
            message: "El token no existe!",
        });
    }
    next();

};