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
       

        let User:any = await queryData.queryGet(app_settings.METHOD.GET,app_settings.schema,app_settings.TABLES.ADMIN,Object.keys({idadmin:payload.id}),Object.values({idadmin:payload.id}),["WHERE"],[],req)
       
        if (User) {
            let user = {
                id: User.resultGet?.rows[0].idadmin,
                email: User.resultGet?.rows[0].email,
                rol: User.resultGet?.rows[0].rol,
            }
            return done(null, user)
        }
        return done(null, false)
    } catch (error) {
        
        return done(error)
    }
})