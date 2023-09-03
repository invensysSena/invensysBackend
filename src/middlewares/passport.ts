import { Strategy, ExtractJwt } from "passport-jwt"
import { SECRET } from "../config/config";
import { queryData } from "../secure/DbQuery";
import { Request,Response } from "express";
import settings from "../data/settings.json";

let app_settings = settings[0]

let req:Request|any = {} as Request


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

export default new Strategy(opts, async(payload, done) => {
    try {
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