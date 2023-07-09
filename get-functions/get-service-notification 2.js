// database
const models = require("../connect-to-database");
const Applications = models.Application;

// access database, call functions, display page
const get_service_applicants_notifications = async function (service_name) {
    try {
        const applicants = await Applications.find({ is_new_applicant: true, service: service_name }).exec();
        return applicants;
    } catch (error) {
        console.error(error);
        return { success: false, error: 'internal database error' };
    }
}


module.exports = get_service_applicants_notifications;