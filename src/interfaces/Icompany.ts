import mongoose from 'mongoose';

export interface ICompany extends mongoose.Document {
    tokenIdUser:string
    tipoPersona: string;
    nit: number;
    tipoIdentificacion: string;
    numero: number;
    nombre: string;
    correo: string;
    telefono: number;
    pais: string;
    departamento: string;
    ciudad: string;

}

