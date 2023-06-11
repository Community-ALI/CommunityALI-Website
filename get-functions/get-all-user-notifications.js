
// database
const models = require("../connect-to-database");
const Applications = models.Application;
const Services = models.Services;

// access database, call functions, display page
const get_all_user_notifications = async function (username) {
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


module.exports = get_all_user_notifications;