const database = require("./../../../connect-to-database");
const User = database.User;

// get a user's applications from database
exports.GET = async function (_id) {
    try {
      const selected_account = await User.findById(_id).exec();
      return selected_account;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  };

  exports.PUT = async function (_id, body) {
    try {
      const selected_account = await User.findByIdAndUpdate(
        _id,
        body,
        { new: true }
      ).exec();
      return selected_account;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }