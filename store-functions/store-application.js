// FILE OVERVIEW
// This file recieves an application from the user
// Then, it stores that application in the database
// Finally, it sends the user to the signup-success.html page

const models = require("../connect-to-database");

const Application = models.Application;
const Service = models.Services;
const User = models.User;

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIA5XTVYBKVHVNBFVAE',
  secretAccessKey: 'catalyst_2022',
});

const sns = new AWS.SNS();


function sendNotification(req, user) {
  const messageParams = {
    Message: `${req.body.name} has signed up to your service: ${req.body.service}`,
    subject: `${req.body.service} has new applicants`,
    TopicArn: 'arn:aws:sns:us-west-2:944066005674:serviceApplicantSNS',
    TargetArn: `arn:aws:sns:your-aws-region:your-account-id:endpoint/email/${user.email}`,
  };

  sns.publish(messageParams, (err, data) => {
    if (err) {
      console.error('Error publishing message:', err);
    } else {
      console.log('Message published successfully:', data.MessageId);
    }
  });
}

const store_application = async function (req) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    const applicationService = await Service.find({ title: req.body.service }).exec();
    const user = await User.find({ username: applicationService.user }).exec();

    sendNotification(req, user);

    const apply = new Application({
      service: req.body.service,
      name: req.body.name,
      email: req.body.email,
      w_number: req.body.w_number,
      date: formattedDate,
      time: time,
      is_new_applicant: true
    });

    await apply.save(); // Use await to wait for the save operation to complete

    // Display success page
    return 'success';
  } catch (error) {
    console.log(error);
    return 'failure';
  }
};

module.exports = store_application;