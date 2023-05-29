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
exports.sendMailAdmin = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class sendMailAdmin {
    sendMailer(email) {
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
                subject: "Bienvenido(a) a Stored",
                html: `
                   <div style=" width:400px; margin: 2px 0px;
                   border-radius:6px; overflow: hidden;
				  padding: 0px; box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;">
				  <div style="font-family: Arial, Helvetica, sans-serif;
				  border-bottom: 1px solid #009AFA; background-color: #009AFA; color: white;
				   text-align: center; font-size: 26px; padding: 15px;">Bienvenido(a)  a stored..</div>
                  <p style="font-weight: 500; font-size:20px; font-family:Arial, Helvetica, sans-serif;text-align:center;
				   padding: 5px;">
				<img src="https://res.cloudinary.com/dkqp3wkbi/image/upload/v1668635577/2807611_n1l9wx_fc3a67.jpg" alt="" style="width: 350px;">   
				</p>
                  <p style="font-family:Arial, Helvetica, sans-serif;
				  text-align: center; padding: 10px; ">Gracias por Registrarte en nuestra plataforma stored,
				  te brindaremos la mejor experiancia y calidad, disfrutaras  de todos los beneficios 
				que tenemos para tu negocio.  </p>
				<div>
					<ul style="list-style: none; padding: 1px;">
						<li style="white-space: nowrap;"><span
							style="background: rgb(13, 30, 48);
							color: #fff; padding: 10px 15px; margin-bottom: 10px; display: inline-block; border-radius: 20px; font-size: 20px; font-family:Arial, Helvetica, sans-serif;"
							
							> 1</span>
						<span
						style="background: rgba(40, 189, 226, 0.23); border-radius: 4px; padding: 8px 6px;
						display: inline-block;
						font-family: Arial, Helvetica, sans-serif; white-space: nowrap;"
						>✅ Manejo de tu inventario mas facil y comodo</span>
						</li>
						<li  style="white-space: nowrap;"><span
							style="background: rgb(13, 30, 48);
							color: #fff; padding: 10px 15px; margin-bottom: 10px; display: inline-block; border-radius: 20px; font-size: 20px; font-family:Arial, Helvetica, sans-serif;"
							> 2</span>
							<span style="background: rgba(40, 189, 226, 0.23); border-radius: 4px; padding: 8px 6px;
													display: inline-block;
													font-family: Arial, Helvetica, sans-serif; white-space: nowrap;">
													✅ Disminución de pérdidas en tus productos
												</span>
												</span>
						</li>
						<li  style="white-space: nowrap;"><span
							style="background: rgb(13, 30, 48);
							color: #fff; padding: 10px 15px; margin-bottom: 10px; border-radius: 20px; font-size: 20px; display: inline-block; font-family:Arial, Helvetica, sans-serif;"
							> 3</span>
						<span style="background: rgba(40, 189, 226, 0.23); border-radius: 4px; padding: 8px 6px;
																			display: inline-block;
																			font-family: Arial, Helvetica, sans-serif; white-space: nowrap;">
							✅ Reportes de ventas y ganancias</span>

						
						</span>
						</span>
						</li>
						<li  style="white-space: nowrap;"><span
							style="background: rgb(13, 30, 48);
							color: #fff; padding: 10px 15px; margin-bottom: 10px; border-radius: 20px; display: inline-block; font-size: 20px; font-family:Arial, Helvetica, sans-serif;"
							> 4</span>
						<span style="background: rgba(40, 189, 226, 0.23); border-radius: 4px; padding: 8px 6px;
																									display: inline-block;
																									font-family: Arial, Helvetica, sans-serif; white-space: nowrap;">
							✅ Estadisticas y informes de tu negocio</span>
						</span>
						</li>
					</ul>
				</div>
                   
					<p style="font-family:Arial, Helvetica, sans-ser;
					text-align: center; border-top: 1px solid #ccc; padding: 4px;">
					⚠️ Este mensaje se envio a: ${email} </p>
					<p style="font-family:Arial, Helvetica, sans-ser;
					text-align: center;  padding: 4px;">Si tienes alguna duda:  <a href="/contactanos">Contactanos</a></p>
					<p style="font-family:Arial, Helvetica, sans-ser;
										text-align: center; border-top: 1px solid #ccc; padding: 4px;">
						↪️ <a href="/terminos">Terminos y condiciones en privacidad de datos y uso de cokies</a> </p>
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
exports.sendMailAdmin = sendMailAdmin;
//# sourceMappingURL=libs.js.map