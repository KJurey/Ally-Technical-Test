const { prisma } = require("../lib/db");

async function getCountries(event) {
  try {
    const countries = await prisma.country.findMany();
    return {
      statusCode: 200,
      body: JSON.stringify(countries),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

module.exports = { getCountries };
