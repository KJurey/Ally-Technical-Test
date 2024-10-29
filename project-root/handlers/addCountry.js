const { prisma } = require("../lib/db");

async function addCountry(event) {
  const { name, capital, code } = JSON.parse(event.body);
  try {
    const country = await prisma.country.create({
      data: { name, capital, code },
    });
    return {
      statusCode: 201,
      body: JSON.stringify(country),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
module.exports = { addCountry };
