const { prisma } = require("../lib/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function register(event) {
  const { email, password, name } = JSON.parse(event.body);
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email already exists" }),
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "8h",
    });

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });

    return {
      statusCode: 201,
      body: JSON.stringify({ token, user }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

module.exports = { register };
