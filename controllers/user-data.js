// libraries
const fs = require("fs");
// database
const models = require("../connect-to-database");
const Applications = models.Application;
const Services = models.Services;
const Users = models.User;
const sharp = require("sharp");


// generate a smaller version of the profile image
const generateMiniProfileImage = async function (photoBuffer) {
  try {
    // Load the photo buffer from the service

    // Create a thumbnail with lower resolution using sharp
    const thumbnailBuffer = await sharp(photoBuffer)
      .resize(100, 100) // Set the desired  dimensions
      .toBuffer();

    // Convert the thumbnail buffer to a base64-encoded string
    const thumbnailBase64 = thumbnailBuffer.toString('base64');

    // Create a new Buffer object with the Base64-encoded string
    const thumbnailBinData = new Buffer.from(thumbnailBase64, 'base64');

    // Update the service object with the thumbnail field as BinData
    return thumbnailBinData;
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Error generating thumbnail' };
  }
};

// access database, call functions, display page
exports.get_all_user_notifications = async function (username) {
  try {
    const selected_services = await Services.find({ user: username })
      .select("title")
      .exec();
    const serviceTitles = selected_services.map((service) => service.title);
    const applicants = await Applications.find({
      is_new_applicant: true,
      service: { $in: serviceTitles },
    }).exec();
    return applicants;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

exports.set_user_data = async function (username, req) {
  try {
    const selected_account = await Users.findOne({ username: username });

    if (selected_account) {
      // Update only the fields found in req.body.account
      Object.assign(selected_account, JSON.parse(req.body.account));
      const image = fs.readFileSync(req.file.path);
      selected_account.profileImage = image;
      selected_account.miniProfileImage = await generateMiniProfileImage(image);
      // Save the updated account back to the database
      await selected_account.save();

      return selected_account;
    } else {
      // TODO: Error handling
    }
  } catch (error) {
    console.log(error);
  }
};

exports.unsubscribe_user = async function (email) {
  try {
    const selected_account = await Users.findOne({ email: email });
    selected_account.sendNotifications = false;
    await selected_account.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
};

exports.upload_user_image = async function (username, req) {
  try {
    const account = await Users.findOne({ username: username });
    const image = fs.readFileSync(req.file.path);
    account.profileImage = image;
    await account.save();
    console.log("updated profile image for", username);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
};

// get user services from database
exports.get_user_services = async function (username, requestedServices) {
  try {
    if (requestedServices === undefined) {
      requestedServices = "title";
    }
    const selected_services = await Services.find({ user: username })
      .select(requestedServices)
      .exec();
    return selected_services;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

exports.toggle_user_admin = async function (username, adminType) {
  try {
    currentIsAdmin = await Users.find({ username: username })
      .select(adminType)
      .exec();
    Users.findOneAndUpdate(
      { username: username },
      { adminType: !currentIsAdmin.adminType }
    ).exec;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

// get a user's applications from database
exports.get_user_applications = async function (username) {
  try {
    const selected_applications = await Applications.find({ name: username })
      .select("service")
      .exec();
    return selected_applications;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

// get a user's applications from database
exports.get_user_data = async function (username) {
  try {
    const selected_account = await Users.find({ username: username })
      .select("username email description dateCreated profileImage fullName sendNotifications")
      .exec();
    return selected_account;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

exports.get_all_users = async function () {
  try {
    const users = await Users.find().exec();
    return users;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
