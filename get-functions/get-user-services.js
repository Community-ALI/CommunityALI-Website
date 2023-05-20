// database
const models = require("../connect-to-database");
const Services = models.Services;


// get all services from database
const get_services = async function (username) {
  try {
    const selected_services = await Services.find({ user: username }).exec();
    return selected_services;
  } catch (error) {
    console.error(error);
    return { success: false, error: 'internal database error' };
  }
}

// export to app.js 
module.exports = get_services;