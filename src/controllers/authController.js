import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: "student",
    };

    const result = await createUser(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await findUserByEmail(email);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
