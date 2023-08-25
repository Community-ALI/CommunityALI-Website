
const models = require("../connect-to-database");
const Service = models.Services;
const Applications = models.Application;
const Application = models.Application;
const User = models.User;

const jwt = require('jsonwebtoken');

exports.change_notification_status = async function (req) {
    try {
        const id = req.params.id;
        console.log("id:", id)

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

exports.store_application = async function (req) {
    try {
        const currentDate = new Date();
        const isoDate = currentDate.toISOString(); // Convert to ISO date and time string
        const formattedDate = currentDate.toLocaleDateString();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

        console.log("service: " + req.body.service);

        // Get the user who created the application
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;


        const apply = new Application({
            service: req.body.service,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date: formattedDate,
            time: time,
            isoDate: isoDate, // we should try to use this instead of date and time
            is_new_applicant: true,
            // save the user_id of the user who created the application
            user: username,
            
        });

        await apply.save();

        return {success: true, application_id: apply._id};
    } catch (error) {
        console.log(error);
        return {success: false, error: error};
    }
};

// remove an applicant from a service
exports.remove_applicant = async function (service_name, username) {
    try{
        await Applications.findOneAndDelete({ service: service_name, user: username }).exec();
        return {success: true};
    }
    catch(error){
        console.log(error);
        return {success: false, error: error};
    }
}
    



exports.get_service_applicants = async function (service_name) {
    try {
        // Get the applicants to a service (only necessary fields)
        const applications = await Applications.find({ service: service_name })
            .select("name email phone isoDate is_new_applicant user miniProfileImage _id")
            .exec();

        // Create an array of promises to fetch miniProfileImages concurrently
        var applicantsWithMiniProfileImages = [];
        const miniProfileImagePromises = applications.map(async (applicant) => {
            const username = applicant.user;
            // Get the user's mini profile image from the database
            const user = await User.findOne({ username: username }).select("miniProfileImage").exec();
            if (user) {
                const applicantWithMiniProfileImage = {
                    _id: applicant._id,
                    name: applicant.name,
                    email: applicant.email,
                    phone: applicant.phone,
                    isoDate: applicant.isoDate,
                    is_new_applicant: applicant.is_new_applicant,
                    user: applicant.user,
                    miniProfileImage: user.miniProfileImage
                }
                applicantsWithMiniProfileImages.push(applicantWithMiniProfileImage);
            }
            else{ // this could happen if the application was created by a user with no profile image
                console.log(applicant);
                applicantsWithMiniProfileImages.push(applicant);
            }
        });

        // Wait for all miniProfileImage promises to resolve
        await Promise.all(miniProfileImagePromises);
        // console.log(applicants);
        return applicantsWithMiniProfileImages;
    } catch (error) {
        console.error("Error in get_service_applicants:", error);
        throw error;
    }
};

exports.get_service_applicants_notifications = async function (service_name) {
    try {
        const applicants = await Applications.find({ is_new_applicant: true, service: service_name }).exec();
        return applicants;
    } catch (error) {
        console.error(error);
        return { success: false, error: 'internal database error' };
    }
}