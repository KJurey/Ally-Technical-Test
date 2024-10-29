const { register } = require("./handlers/register");
const { login } = require("./handlers/login");
const { getCountries } = require("./handlers/countries");
const { addCountry } = require("./handlers/addCountry");
const { getUsers } = require("./handlers/getUsers");
const { addTask } = require("./handlers/addTask");
const { deleteCountry } = require("./handlers/deleteCountry");
const { verifyToken } = require("./handlers/verifyToken");

exports.handler = async (event) => {
  const { path, httpMethod } = event;
  if (path === "/register" && httpMethod === "POST") {
    return await register(event);
  }
  if (path === "/login" && httpMethod === "POST") {
    return await login(event);
  }
  if (path === "/countries" && httpMethod === "GET") {
    return await getCountries(event);
  }
  if (path === "/countries" && httpMethod === "POST") {
    return await addCountry(event);
  }
  if (path === "/countries" && httpMethod === "DELETE") {
    return await deleteCountry(event);
  }
  if (path === "/users" && httpMethod === "GET") {
    return await verifyToken(getUsers)(event);
  }
  if (path === "/tasks" && httpMethod === "POST") {
    return await verifyToken(addTask)(event);
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
