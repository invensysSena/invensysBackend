import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET } from '../config/config';


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    

    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json({ error: 'Access denied' });
        const verified = jwt.verify(token, SECRET);
        req.body = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }





};