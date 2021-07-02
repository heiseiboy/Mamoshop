import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mamo",
    email: "mamo@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Dai",
    email: "dai@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
