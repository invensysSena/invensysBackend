"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI_LOCAL = exports.MONGO_URI_ATLAS = exports.claudinar_Name = exports.claudinarySecret = exports.cludinaryKey = exports.MAIL_USER = exports.MAIL_PASSWORD = exports.LIMIT_CONNECION = exports.PORTDB = exports.USER = exports.PASSWORD = exports.DBNAME = exports.HOST = exports.SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env["PORT"];
exports.SECRET = process.env["SECRET"];
// ? DATABASE
exports.HOST = "localhost";
exports.DBNAME = "stored";
exports.PASSWORD = process.env["PASSWORD"];
exports.USER = process.env["USER"];
exports.PORTDB = process.env["PORTDB"];
exports.LIMIT_CONNECION = process.env["CONNECTION_LIMIT"];
exports.MAIL_PASSWORD = process.env["MAIL_PASSWORD"];
exports.MAIL_USER = process.env["MAIL_USER"];
// coudinary
exports.cludinaryKey = process.env['cloudinaryKey'];
exports.claudinarySecret = process.env['cloudinarySecret'];
exports.claudinar_Name = process.env['claudinar_Name'];
//  mongoose key 
// ? MONGO
exports.MONGO_URI_ATLAS = process.env["MONGO_URI_ATLAS"];
exports.MONGO_URI_LOCAL = process.env["MONGO_URI_LOCAL"];
//# sourceMappingURL=config.js.map