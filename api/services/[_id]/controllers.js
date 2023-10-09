const database = require("./../../../connect-to-database");
const Services = database.Services;

exports.GET = async function (_id) {
  try {
    console.log("getting service:", _id);
    const selected_service = await Services.findById(_id).exec();

    if (!selected_service) {
      console.error(`No service found with the _id: '${_id}'.`);
      return { success: false, error: "no service with the provided _id" };
    }

    return selected_service;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
