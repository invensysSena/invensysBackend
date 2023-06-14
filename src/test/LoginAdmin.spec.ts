import request from "supertest";
import { Request, Response } from "express";
export const urlServerConfigPort: string = "http://localhost:5454";

describe("postAdmin data ", () => {
  it("post Data login ", async () => {
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
  });
});

let token: string = "";

describe("GET PRINCIPAL", () => {
  it("post Data login ", async () => {
    const res = await request(urlServerConfigPort)
      .post("/login")
      .send({
        postDataUser: {
          correo: "daniel1008ospina1@gmail.com",
          password: "123456",
        },
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
    
    // guardar token y enviarlo en el header
  });
});

// describe("Resgister user Acceso a token ", () => {
//   it("post Data login ", async () => {
//     const res = await request(urlServerConfigPort)
//       .post("/registerUser")
//       .set("authorization", `Bearer ${token}`)
//       .send({
//         postDataUser: {
//           correo: "daniel@hmail.com",
//           password: "123456",
//         },
//       });
//     expect(res.status).toEqual(200);
//     expect(res.body).toHaveProperty("token");
//   });
// });
