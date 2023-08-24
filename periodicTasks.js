
const models = require("./connect-to-database");
const Service = models.Services;
const Applications = models.Application;
const Application = models.Application;
const User = models.User;

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ses = new AWS.SES();

// email function
const sendEmail = async (toAdress, subject, body) => {
  // Add the unsubscribe link to the email body
  const unsubscribeLink = `https://communityali.org/unsubscribe?email=${encodeURIComponent(toAdress)}`;
  body += `\n\nTo unsubscribe, click here: ${unsubscribeLink}`;

  const params = {
    Destination: {
      ToAddresses: [toAdress],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: "communityalis@gmail.com",
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log(`Email sent to ${toAdress} successfully:`, data.MessageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// function to send a notification email to all users collaborating on a service if that service has one or more new applicants
exports.send_email_notifications = async function () {
  try{
    const new_applications = await Applications.find({ is_new_applicant: true }).exec();
    // organize applications by service
    const services = {};
    for (let i = 0; i < new_applications.length; i++) {
        const application = new_applications[i];
        if (services[application.service]) {
            services[application.service].push(application);
        } else {
            services[application.service] = [application];
        }
    }
    // send email to each service owner
    for (const service_name in services) {
        const service = await Service.findOne({ title: service_name }).exec();
        const user = await User.findOne({ username: service.user }).select('username email sendNotifications lastNotificationCheck').exec();
        const service_owner = JSON.parse(JSON.stringify(user)); // convert Mongoose object to JSON object
        const applicants = services[service_name];
        
        // Check if the service owner wants to receive notifications
        if (service_owner.sendNotifications) {
            // Filter applicants based on the user's lastNotificationCheck
            const filteredApplicants = applicants.filter(applicant => {
                const applicantIsoDate = new Date(applicant.isoDate);
                const lastCheckIsoDate = new Date(service_owner.lastNotificationCheck);
                console.log(applicantIsoDate, lastCheckIsoDate);
                return applicantIsoDate > lastCheckIsoDate;
            });

            if (filteredApplicants.length > 0) {
                let body = `You have ${filteredApplicants.length} new applicant(s) for your service: ${service_name}\n\n`;
                for (let i = 0; i < filteredApplicants.length; i++) {
                    const applicant = filteredApplicants[i];
                    body += `Name: ${applicant.name}\nEmail: ${applicant.email}\n\n`;
                }
                await sendEmail(service_owner.email, `New Applicants for "${service_name}"`, body);

                // Update the user's lastNotificationCheck to the current ISO date
                service_owner.lastNotificationCheck = new Date().toISOString();
                const user = await User.findOne({ username: service_owner.username }).exec();
                user.lastNotificationCheck = service_owner.lastNotificationCheck;
                await user.save();
            } else {
                console.log('No new applicants for', service_owner.username);
            }
        } else {
            console.log('Notification not sent to', service_owner.username, 'because they have notifications turned off');
        }
    }
  }
  catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
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