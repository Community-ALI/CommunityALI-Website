// Require the neccesary libraries and modules 
// set up express
const express = require("express");
const path = require('path');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
const serviceRouter = require("./routes/service");
const applicantRouter = require("./routes/applicant");

const { CognitoIdentityServiceProvider } = require('aws-sdk');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


app.use('/userdata', userRouter);
app.use('/applicantdata', applicantRouter);
app.use('/servicedata', serviceRouter);

//last route, important for frontend I believe
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});