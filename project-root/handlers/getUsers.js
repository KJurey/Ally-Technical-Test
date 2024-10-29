const { prisma } = require("../lib/db");

module.exports.getUsers = async (event) => {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
