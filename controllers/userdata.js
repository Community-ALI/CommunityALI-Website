// database
const models = require("../connect-to-database");
const Applications = models.Application;
const Services = models.Services;
const Users = models.User;

// access database, call functions, display page
exports.get_all_user_notifications = async function (username) {
  try {
    const selected_services = await Services.find({ user: username }).select('title').exec();
    const serviceTitles = selected_services.map(service => service.title);
    const applicants = await Applications.find({ is_new_applicant: true, service: { $in: serviceTitles } }).exec();
    return applicants;
  } catch (error) {
    console.error(error);
    return { success: false, error: 'internal database error' };
  }
}

exports.set_account_data = async function (username, req) {
  try {
    const selected_account = await Users.findOne({ username: username });

    if (selected_account) {
      // Update only the fields found in req.body.account
      Object.assign(selected_account, req.body.account);

      // Save the updated account back to the database
      await selected_account.save();

      return selected_account; // Optional: Return the updated account
    } else {
      // Handle case when account with the given username is not found
      // return an appropriate response or throw an error
    }
  } catch (error) {
    // Handle any errors that occurred during the update process
    // return an appropriate response or throw an error
  }
};


// get user services from database
exports.get_services = async function (username) {
  try {
    const selected_services = await Services.find({ user: username }).select('title').exec();
    return selected_services;
  } catch (error) {
    console.error(error);
    return { success: false, error: 'internal database error' };
  }
}

// get a user's applications from database
exports.get_applications = async function (username) {
  try {
    const selected_applications = await Applications.find({ name: username }).select('service').exec();
    return selected_applications;
  } catch (error) {
    console.error(error);
    return { success: false, error: 'internal database error' };
  }
}

// get a user's applications from database
exports.get_account = async function (username) {
  try {
    const selected_account = await Users.find({ username: username }).select('username email description dateCreated').exec();
    return selected_account;
  } catch (error) {
    console.error(error);
    return { success: false, error: 'internal database error' };
  }
}