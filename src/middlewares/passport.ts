import { Strategy, ExtractJwt } from "passport-jwt"
import { SECRET } from "../config/config";
import { queryData } from "../secure/DbQuery";
import settings from "../data/settings.json";
import { Logger } from "../utils/Logger";

let app_settings = settings[0]


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

export default new Strategy(opts, async(payload, done) => {
    try {
        let req:any = payload
        let User:any;
        let user:any;

        if(payload.idUser !== null ){
            User = await queryData.queryGet(app_settings.METHOD.GET,
            app_settings.schema,app_settings.TABLES.USERS,Object.keys({iduser:payload.idUser}),
            Object.values({iduser:payload.idUser}),["WHERE"],[],req)  
            }else{
                User= await queryData.queryGet(app_settings.METHOD.GET,
                app_settings.schema,app_settings.TABLES.ADMIN,Object.keys({idadmin:payload.id}),
                Object.values({idadmin:payload.id}),["WHERE"],[],req)
                 
            }
        if (User) {
             user = {
                id: User.resultGet?.rows[0].idadmin,
                email: User.resultGet?.rows[0].email,
                rol: User.resultGet?.rows[0].rol,
                iduser: User.resultGet?.rows[0].iduser,

            }
            Logger().debug({message:"USER"})
            return done(null, user)
        }
        Logger().error({message:"NOT USER"})
        return done(null, false)
    } catch (error) {
        Logger().error({message:error})
        return done(error)
    }
})