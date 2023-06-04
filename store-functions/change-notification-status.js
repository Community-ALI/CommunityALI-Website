const models = require("../connect-to-database");
const Application = models.Application;

const change_notification_status = async function (req) {
    try {
        const id = req.params.id;

        // Find the document by ID and update the is_new_applicant field to false
        const application = await Application.findByIdAndUpdate(id, { $set: { is_new_applicant: false } }, { new: true });

        // Check if the application exists
        if (!application) {
            throw new Error('Application not found');
        }

        // Return success message
        return 'success';
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
};

module.exports = change_notification_status;
