import { pool } from "../../db";
import type { IUser} from "./user.interface";
import bcrypt from "bcryptjs";
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;

  const hashPassword = await bcrypt.hash(password, 16);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,age)
    VALUES($1,$2,$3,$4) RETURNING *
    `,
    [name, email, hashPassword, age],
  );
  // console.log(result);
  delete result.rows[0].password;
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await pool.query(`
  SELECT * FROM users
  `);
  return result;
};

const getUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [id],
  );
  return result;
};

const updateUserFromDB = async (payload: Partial<IUser>, id: string) => {
const { name, password, age, is_Active } = payload;
 
const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  const result = await pool.query(
    `
      UPDATE users 
      SET
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_Active = COALESCE($4, is_Active),
      updated_at = NOW()
      WHERE id=$5 RETURNING *
    `,
    [name ?? null, hashedPassword , age ?? null, is_Active ?? null, id],
  );
  if (result.rows[0]) {
    delete result.rows[0].password;
  }
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
