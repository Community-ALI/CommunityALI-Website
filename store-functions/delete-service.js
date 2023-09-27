const models = require("../connect-to-database");
const Services = models.Services;


const delete_service = async function (service_name) {
  try {
    const selected_service = await Services.deleteOne({ title: service_name });

    if (!selected_service) {
      console.error(`No service found with the name '${service_name}'.`);
      return { success: false, error: 'no service with the provided name' };
    }

    return selected_service;
  } catch (error) {
    console.error(error);
    return { success: false, error: 'internal database error' };
  }
};


module.exports = delete_service;
