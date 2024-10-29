const { prisma } = require("../lib/db");

module.exports.addTask = async (event) => {
  const { title, status, userId } = JSON.parse(event.body);
  try {
    const task = await prisma.task.create({
      data: { title, status, userId },
    });
    return {
      statusCode: 201,
      body: JSON.stringify(task),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
