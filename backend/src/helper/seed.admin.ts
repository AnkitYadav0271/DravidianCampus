import { adminModel } from "../models/admin.model.ts";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  if (!(await adminModel.findOne({ email: "ankitofficial0271@gmail.com" }))) {
    const hashed = await bcrypt.hash("admin_password", 10);
    const admin = await adminModel.create({
      email: "dravidiancampus@gmail.com",
      password: hashed,
    });

    console.log(admin);
  }
};
