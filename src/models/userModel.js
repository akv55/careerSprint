import { query } from "../config/db.js";

export const createUser = async (user) => {
  const { id, name, email, password, role } = user;
  const result = await query(
    `INSERT INTO users (id, name, email, password, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role`,
    [id, name, email, password, role]
  );
  return result;
};

export const findUserByEmail = async (email) => {
  return query(`SELECT * FROM users WHERE email = $1`, [email]);
};
