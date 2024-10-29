const { prisma } = require("../lib/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function login(event) {
  const { email, password } = JSON.parse(event.body);
  const user = await prisma.user.findUnique({ where: { email } });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "8h",
    });

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ token, user }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

module.exports = { login };
