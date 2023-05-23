import mongoose from 'mongoose';
import { ICompany } from '../interfaces/Icompany'; 

const CompanySchema = new mongoose.Schema({
  tipoPersona: { type: String, require: true },
  nit: { type: Number, require: true },
  tipoIdentificacion: { type: String, require: true },
  numero: { type: Number, require: true },
  nombre: { type: String, require: true },
  correo: { type: String, require: true },
  telefono: { type: Number, require: true },
  pais: { type: String, require: true },
  departamento: { type: String, require: true },
  ciudad: { type: String, require: true },
  direccion: { type: String, require: true },

});

export default mongoose.model<ICompany>('Company', CompanySchema);