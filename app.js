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

const ses = new AWS.SES();

function generateSixDigitCode() {
  var code = "";
  for (var i = 0; i < 6; i++) {
    var digit = Math.floor(Math.random() * 10); // Generate a random digit from 0 to 9
    code += digit.toString(); // Append the digit to the code string
  }
  return code;
}

const crypto = require('crypto');

// Function to generate a cryptographically secure random token
function generateRandomToken(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString('hex');
        resolve(token);
      }
    });
  });
}

const sendEmail = async (toAdress, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [toAdress]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    },
    Source: 'communityalis@gmail.com'
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', data.MessageId);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

app.use('/userdata', userRouter);

//last route, important for frontend I believe
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});