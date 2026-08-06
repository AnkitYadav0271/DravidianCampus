import { adminModel } from "../models/admin.model.js";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  if (!(await adminModel.findOne({ email: "dravidiancampus1@gmail.com" }))) {
    const hashed = await bcrypt.hash("admin_password", 10);
    const admin = await adminModel.create({
      email: "dravidiancampus1@gmail.com",
      password: hashed,
    });
  }
};
