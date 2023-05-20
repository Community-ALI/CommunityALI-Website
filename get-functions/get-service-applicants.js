
// database
const models = require("../connect-to-database");
const Applications = models.Application;

// access database, call functions, display page
const get_service_applicants = async function (service_name) {
  // get database
  const applicants = await Applications.find({ service: service_name }).exec();
  return applicants;
}


module.exports = get_service_applicants;