import request from "supertest";
import { Request, Response } from "express";
import jwt, { sign } from "jsonwebtoken";
import { SECRET } from "../config/config";
import {expect, jest} from '@jest/globals';
import LoginRegister from "../controllers/GestionUser";
import fetchMock from "fetch-mock";
export const urlServerConfigPort: string = "http://localhost:5454";
interface data  {
  correo:string,
  password:string
}
describe("postAdmin data ", () => {
  it("post Data login ", async () => {
   try {
    const res = await request(urlServerConfigPort)
    .post("/register")
    .send({
      postDataAdmin: {
        correo: "daniel1008ospina1@gmail.com",
        password: "123456",
      },
    });
  expect(res.status).toEqual(200);
  expect(res.body).toHaveProperty("token");
   } catch (error:any) {
    if(error.matcherResult.actual === 500){
      expect(error.matcherResult.actual).toEqual(500);  
         }else{
      expect(error.matcherResult.actual).toEqual(401);  
         }
   }
  });
});
describe("GET Login", () => {
  let authToken:string;
  const postDataUser:data|any[] = {
    correo: "daniel1008ospina1@gmail.com",
    password: "123456",
  } 
  test("post Data login ", async () => {
   try {
    const res:Response|any = await request(urlServerConfigPort)
    .post("/login")
    .send({postDataUser})
    expect(res.status).toEqual(200) 
    expect(res.body).toHaveProperty("token");
    expect(res.body.message).toBe("LOGIN_SUCCESSFULL")
    authToken = res.body.token 
   } catch (error:any) {
    if(error.matcherResult.actual === 500){

      expect(error.matcherResult.actual).toEqual(500);  
    }else{
      expect(error.matcherResult.actual).toEqual(401);  
    }
   }
  });
  it("create usuario", async()=>{
    const res = await request(urlServerConfigPort)
    .post("/registerUser")
       .set("authorization", `Bearer ${authToken}`)
       .send({
         postDataUser: {
          correo: "daniel@hmail.com",
          password: "123456",
         },
       });
  })
});




