const database = require("../../connect-to-database.js");
const User = database.User;

exports.GET = async function () {
  try {
    return await User.find().exec();
  } catch (error) {
    throw error;
  }
};
