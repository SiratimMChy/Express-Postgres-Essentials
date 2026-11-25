import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config/config";
import { pool } from "../db";
const auth =async (req: Request, res: Response, next: NextFunction) => {
  //if token is exists

  const token = req.headers.authorization;
  //console.log("Authorization Header:", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized!",
    });
  }

  const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload;
  //console.log(decode);
  const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `,[decode.email])

   // console.log(user.rows[0]);

   if (user.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "user not found!",
    });
   }

   if (user.rows[0].is_active) {
    res.status(403).json({
      success: false,
      message: "forbidden!",
    });
   }
    
 req.user= decode;
 
  next();
};

export default auth;
