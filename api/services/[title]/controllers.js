const database = require("../../../connect-to-database.js");
const Services = database.services;

exports.GET = async function (service_name) {
    try {
      const selected_service = await Services.findOne({
        title: service_name,
      }).exec();
  
      if (!selected_service) {
        console.error(`No service found with the name '${service_name}'.`);
        return { success: false, error: "no service with the provided name" };
      }
  
      return selected_service;
    } catch (error) {
      console.error(error);
      return { success: false, error: "internal database error" };
    }
  };