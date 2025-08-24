import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  await mongoose.connect("mogo_db_url_here");
  const passwordHash = await bcrypt.hash("Admin@123", 10);
  await User.create({
    name: "SuperAdmin",
    username: "superadmin", // <-- added username field
    email: "admin@example.com",
    passwordHash: passwordHash, // <-- changed to passwordHash
    role: "admin"
  });
  await mongoose.disconnect();
}
createAdmin();