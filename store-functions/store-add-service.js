const fs = require('fs');
const models = require("../connect-to-database");
const Service = models.Services;

const sharp = require('sharp');

const generateThumbnail = async function (photoBuffer) {
  try {
    // Load the photo buffer from the service

    // Create a thumbnail with lower resolution using sharp
    const thumbnailBuffer = await sharp(photoBuffer)
      .resize(600, 6*67) // Set the desired thumbnail dimensions
      .toBuffer();

    // Convert the thumbnail buffer to a base64-encoded string
    const thumbnailBase64 = thumbnailBuffer.toString('base64');

    // Create a new Buffer object with the Base64-encoded string
    const thumbnailBinData = new Buffer.from(thumbnailBase64, 'base64');

    // Update the service object with the thumbnail field as BinData
    

    return thumbnailBinData;
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Error generating thumbnail' };
  }
};


const store_add_service = async function(req, username) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    const pages = JSON.parse(req.body.pages);

    const photoBuffer = fs.readFileSync(req.file.path);
    const thumbnail = await generateThumbnail(photoBuffer)
    const newService = new Service({
      title: req.body.title,
      serviceType: req.body.serviceType,
      photo: photoBuffer,
      thumbnail: thumbnail,
      pages: pages,
      datePosted: formattedDate,
      timePosted: time,
      user: username
    });
    // make a thumbnail

    await newService.save(); 

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

module.exports = store_add_service;
