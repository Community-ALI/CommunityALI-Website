const database = require("../../../connect-to-database");
const User = database.User;

exports.GET = async function (serviceId, userId) {
  try {
    const user = await User.findById(userId)
      .select("uncheckedMessages")
      .populate("uncheckedMessages")
      .exec();
    console.log(user);
    const serviceMessages = user.uncheckedMessages.filter(
      (message) => message.sender == serviceId
    );

    console.log("Messages successfully retrived from database");
    return serviceMessages;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
