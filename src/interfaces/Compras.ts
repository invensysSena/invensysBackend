 
import { Document } from 'mongoose';


export interface ICompras extends Document {
    id_user_token: string;
    id_product: string;
    company: string;
    quantity: number;
    total: number;
    date: Date; 
}