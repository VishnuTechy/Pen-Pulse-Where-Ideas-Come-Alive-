// scripts/createAdmin.js
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  await User.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });
  console.log("Admin created");
}
createAdmin();
