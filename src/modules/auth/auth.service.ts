import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: {
    email: string, password: string
}) => {
    const { email, password } = payload;
    const user = await pool.query(`
    SELECT * FROM users WHERE email=$1 `,
        [email])
    //console.log(user.rows[0]);

    if (user.rowCount === 0) {
        throw new Error("Invalid Credentials!!")
    }
    const matchPassword = await bcrypt.compare(password, user.rows[0].password)

    if (!matchPassword) {
        throw new Error("Password Not match !!")
    }
    if (!user.rows[0].is_active) {
        throw new Error("User account is inactive!!");
    }

    const userData = user.rows[0];
    const jwtPayload = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        is_active : userData.is_active,
    };
    const accessToken = jwt.sign(jwtPayload,process.env.JWT_SECRET as string,{
        expiresIn:"1d"
    })

    const { password: __, ...safeUserData } = userData;

return { accessToken, userData: safeUserData };

}


export const authService = {
    loginUserIntoDB
}