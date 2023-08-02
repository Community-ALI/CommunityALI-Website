
const models = require("../connect-to-database");
const Service = models.Services;
const Applications = models.Application;
const User = models.User;
const sharp = require('sharp');

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

exports.store_application = async function (req) {
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
        module.exports = store_application;

        return 'success';
    } catch (error) {
        console.log(error);
        return 'failure';
    }
};

const generateThumbnail = async function (photoBuffer) {
    try {
      // Load the photo buffer from the service
  
      // Create a thumbnail with lower resolution using sharp
      const thumbnailBuffer = await sharp(photoBuffer)
        .resize(600, 6 * 67) // Set the desired thumbnail dimensions
        .toBuffer();
  
      // Convert the thumbnail buffer to a base64-encoded string
      const thumbnailBase64 = thumbnailBuffer.toString('base64');
  
      // Create a new Buffer object with the Base64-encoded string
      const thumbnailBinData = Buffer.from(thumbnailBase64, 'base64');
  
      // Update the service object with the thumbnail field as BinData
      
      return thumbnailBinData;
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Error generating thumbnail' };
    }
  };
  
  exports.editService = async function (req, username) {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
      console.log(req.body)
      const pages = JSON.parse(req.body.pages);
  
      console.log(req.file);
      const photoBuffer = fs.readFileSync(req.file.path);
      const thumbnail = await generateThumbnail(photoBuffer);
  
      const existingService = await Service.findOne({ title: req.body.title });
  
      if (!existingService) {
        throw new Error('Service with matching title not found');
      }
  
      existingService.photo = photoBuffer;
      existingService.thumbnail = thumbnail;
      existingService.pages = pages;
      existingService.datePosted = formattedDate;
      existingService.timePosted = time;
      existingService.user = username;
  
      await existingService.save();
  
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
