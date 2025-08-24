import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  console.log(MONGO_URI);
  await mongoose.connect("mongodb+srv://vishnuharikrishnan12:6JgtH5qfrzyYn2kc@cluster0.mmkmecg.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0");
  const passwordHash = await bcrypt.hash("Admin@123", 10);
  await User.create({
    name: "SuperAdmin",
    username: "superadmin", // <-- added username field
    email: "admin@example.com",
    passwordHash: passwordHash, // <-- changed to passwordHash
    role: "admin"
  });
  console.log("Admin created");
  await mongoose.disconnect();
}
createAdmin();