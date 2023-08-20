const database = require("../connect-to-database");
const Message = database.Message;

exports.save_service_message = async function (message) {
  try {
    console.log(`Message being saved: ${message}`)
    newMessage = new Message(message);
    await newMessage.save();
    console.log("New message saved");
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

exports.get_service_messages = async function (serviceId) {
  try {
    const message = await Message.find({ sender: serviceId })
      .sort({ createdAt: 1 })
      .exec();

    if (!message) {
      console.error(`No service uses the ID: ${serviceId}`);
      return { success: false, error: "No service uses inputted ID" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
