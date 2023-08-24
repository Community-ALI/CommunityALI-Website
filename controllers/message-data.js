const database = require("../connect-to-database");
const Message = database.Message;
Services = database.Services;

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const ses = new AWS.SES();

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

exports.save_service_message = async function (message) {
  try {
    console.log(`Message being saved: ${message}`)
    newMessage = new Message(message);
    await newMessage.save();
    // email each service member about the new message
    const service = await Services.findById(newMessage.sender).exec();
    const serviceMembers = service.members;
    for (let i = 0; i < serviceMembers.length; i++) {
      // get the email of the service member
      const serviceMember = await User.findById(serviceMembers[i]).exec();
      const serviceMemberEmail = serviceMember.email;
      // send the email
      const subject = `New message from ${service.title}`;
      const body = `You have a new message for ${service.title}:\n\n${message.content}`;
      await sendEmail(serviceMemberEmail, subject, body);
    }
    console.log("New message saved");
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};

exports.get_service_messages = async function (serviceId) {
  try {
    const message = await Message.find({ sender: serviceId })
      .sort({ createdAt: -1 })
      .exec();

    if (!message) {
      console.error(`No service uses the ID: ${serviceId}`);
      return { success: false, error: "No service uses inputted ID" };
    }

    console.log("Messages successfully retrived from database");
    return message;
  } catch (error) {
    console.error(error);
    return { success: false, error: "internal database error" };
  }
};
