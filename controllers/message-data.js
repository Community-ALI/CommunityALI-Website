const database = require("../connect-to-database");
const Message = database.Message;
Services = database.Services;

exports.get_service_messages = async function (serviceId) {
  try {
    const message = await Message.find({ sender: serviceId })
      .sort({ createdAt: -1 })
      .exec();

    if (!message) {
      console.error(`No service uses the ID: ${serviceId}`);
      return { success: false, error: "No service uses inputted ID" };
    }

    console.log("Messages successfully retrived from database");
    return message;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
