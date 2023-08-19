import database from "../connect-to-database";
const Message = database.Message;

//TODO: Make message post funtion

// exports.post_message = async function () {};

//TODO: Make message get function

exports.get_service_messages = async function (serviceId) {
  try {
    const message = await Message.find({ sender: serviceId }).exec();

    if (!message) {
        console.error(`No service uses the ID: ${serviceId}`);
        return {success: false, error: "No service uses inputted ID" }
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
