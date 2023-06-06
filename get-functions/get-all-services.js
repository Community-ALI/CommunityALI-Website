// database
const models = require("../connect-to-database");
const Services = models.Services;


// get all services from database
const get_services = async function () {
  try {
    foundServices = await Services.find().exec();
    return foundServices;
  } catch (error) {
    console.log(error);
    return { success: false, error: 'internal database error' };
  }
}

// export to app.js 
module.exports = get_services;