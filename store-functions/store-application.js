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
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
});

const sns = new AWS.SNS();


function sendNotification(req, user) {
  console.log("User Email:", user.email);
  console.log("User:", user);
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

const store_application = async function (req) {
  try {
    const currentDate = new Date();
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