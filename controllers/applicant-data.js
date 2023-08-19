
const models = require("../connect-to-database");
const Service = models.Services;
const Applications = models.Application;
const Application = models.Application;
const User = models.User;

exports.change_notification_status = async function (req) {
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

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2'
});

const sns = new AWS.SNS();


function sendNotification(req, user) {
    console.log("User Email:", user.email);
    console.log("User:", user.username);
    const messageParams = {
        Message: `Subject: ${req.body.service} - New Applicant\n\n${req.body.name} has signed up to your service: ${req.body.service}`,
        TargetArn: `arn:aws:sns:us-west-2:944066005674:serviceApplicantSNS`,
        MessageAttributes: {
            user_id: {
                DataType: "String",
                StringValue: user._id.toString(),
            }
        }
    };

    sns.publish(messageParams, (err, data) => {
        if (err) {
            console.error('Error publishing message:', err);
        } else {
            console.log('Message published successfully:', data.MessageId);
        }
    });
}

exports.store_application = async function (req, user_id) {
    try {
        const currentDate = new Date();
        const isoDate = currentDate.toISOString(); // Convert to ISO date and time string
        const formattedDate = currentDate.toLocaleDateString();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

        console.log("service: " + req.body.service);

        const [serviceArray] = await Promise.all([
            Service.find({ title: req.body.service }).exec(),
        ]);

        const [service] = serviceArray; // Extract the first document from the array

        const [userArray] = await Promise.all([
            User.find({ username: service.user }).exec(),
        ]);

        const [user] = userArray; // Extract the first document from the array

        console.log("applicationService:", service.title);
        console.log("User:", user.username);

        // sendNotification(req, user);


        const apply = new Application({
            service: req.body.service,
            name: req.body.name,
            email: req.body.email,
            w_number: req.body.w_number,
            date: formattedDate,
            time: time,
            isoDate: isoDate, // we should try to use this instead of date and time
            is_new_applicant: true
        });

        await apply.save();

        return {success: true, application_id: apply._id};
    } catch (error) {
        console.log(error);
        return {success: false, error: error};
    }
};

// access database, call functions, display page
exports.get_service_applicants = async function (service_name) {
    // get database
    const applicants = await Applications.find({ service: service_name }).exec();
    return applicants;
}

exports.get_service_applicants_notifications = async function (service_name) {
    try {
        const applicants = await Applications.find({ is_new_applicant: true, service: service_name }).exec();
        return applicants;
    } catch (error) {
        console.error(error);
        return { success: false, error: 'internal database error' };
    }
}