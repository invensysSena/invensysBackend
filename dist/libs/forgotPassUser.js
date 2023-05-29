"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryUserPass = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class recoveryUserPass {
    sendCode(code, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: 'stored754@gmail.com',
                    pass: 'ocgsubbijuoiboiz',
                },
            });
            // send email
            return yield transporter
                .sendMail({
                from: "stored754@gmail.com",
                to: email,
                subject: "Mensajeria de notificaciónes de Stored",
                html: `
                   <div style=" width:400px; margin: 10px auto;
                  justify-content:center; border: 1px solid #ccc; border-radius:6px;
				  padding: 0px; box-shadow: 0px 12px 8px #eee;">
				  <p style="font-family: Arial, Helvetica, sans-serif;
				  border-bottom: 1px solid #009AFA;
				  padding: 6px; text-align: center;">Su correo: ${email}</p>
                  <p style="font-weight: 500; font-size:20px; font-family:Arial, Helvetica, sans-serif;text-align:center;
				   padding: 5px;">Continue con la recuperacion de su contraseña en stored</p>
                  <p style="font-family:Arial, Helvetica, sans-serif;
				  text-align: center; ">Su codigo para el cambio de contraseña 🔏</p>
                   <p style="background: #AED6F1 ; color: rgb(20, 28, 39);
				   padding: 8px; font-size: 25px;
				    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
					text-align: center; border-radius: 4px; 
					 display: block;   margin:4px 9px; ">🔐 ${code}<p/>
					<p style="font-family:Arial, Helvetica, sans-ser; padding: 8px; color: #009AFA;
					 text-align:start; display: inline-block; text-align: center;">Una vez completado, puedes comenzar a utilizar todas las funcionalidades
						de stored 📚📲
					</p>
					<p style="font-family:Arial, Helvetica, sans-ser;
					text-align: center; border-top: 1px solid #ccc; padding: 4px;">
					⚠️ No compartir este codigo con nadie </p>
					<p style="font-family:Arial, Helvetica, sans-ser;
										text-align: center; border-top: 1px solid #ccc; padding: 4px;">
						↪️ <a href="">Terminos y condiciones en privacidad de datos</a> </p>
<p style="font-family:Arial, Helvetica, sans-ser;
										text-align: center;  padding: 4px;">
	© Todos los derechos recervados | Stored </p>
                  </div>
                 `,
            })
                .then((res) => {
                let dataEmail = res;
            })
                .catch((err) => {
                let dataEmailError = err;
            });
        });
    }
}
exports.recoveryUserPass = recoveryUserPass;
//# sourceMappingURL=forgotPassUser.js.map