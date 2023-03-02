// FILE OVERVIEW
// This file recieves an image file from one of us devs
// Then, it stores that file in the database
// this can later be modified into the page that uploads services

const models = require("./define-database-models");
const Image = models.Image;
const fs = require('fs');

const store_image = function(req, res) { 
    
    const images = [];

  // loop through each uploaded file
  for (let file of req.files) {
    // create a new Image instance for the file
    const image = new Image({
      name: req.body.name,
      contentType: file.mimetype,
      data: fs.readFileSync(file.path),
    });

    // remove the temporary file
    fs.unlinkSync(file.path);

    // add the image to the array
    images.push(image);
  }

  // save all images to the database
  Image.insertMany(images, function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving images to database");
    } else {
      console.log("Images saved to database");
      res.json({ message: "Images uploaded successfully" });
    }
  });
}

module.exports = store_image;