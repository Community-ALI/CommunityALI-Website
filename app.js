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
const messageRouter = require("./routes/message");

const userAPI = require("./api/users/routes");
const serviceAPI = require("./api/services/routes");
const messageAPI = require("./api/messages/routes");
const tokenRouter = require("./api/token/routes");

const dotenv = require('dotenv');
dotenv.config();

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const periodicTasks = require('./periodicTasks');
// check for new applicants when the server starts (in case the server restarts)
periodicTasks.send_email_notifications();
// check for new applicants every 24 hours
setInterval(() => {
  console.log('checking for new applicants');
  periodicTasks.send_email_notifications();
}, 86400000);


app.use('/userdata', userRouter);
app.use('/applicantdata', applicantRouter);
app.use('/servicedata', serviceRouter);
app.use('/messagedata', messageRouter);

app.use('/api/users', userAPI);
app.use('/api/services', serviceAPI);
app.use('/api/messages', messageAPI);
app.use('/api/token', tokenRouter);


//last route, important for frontend I believe
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});
