// Require the neccesary libraries and modules 
// set up express
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// allow the client to transfer data
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });

// get db
const get_all_services = require("./get-functions/get-all-services");
const get_one_service = require("./get-functions/get-one-service");

//authorized only get
const get_service_applicants = require("./get-functions/get-service-applicants")
const get_service_applicants_notifications = require("./get-functions/get-service-notification");
// no authorization needed set db
const store_application = require("./store-functions/store-application");
const userRouter = require("./routes/user");

// authorized only set
const store_add_service = require('./store-functions/store-add-service');
const store_edit_service = require('./store-functions/store-edit-service');
const delete_service = require('./store-functions/delete-service');
const change_notification_status = require('./store-functions/change-notification-status');

const models = require("./connect-to-database");
const User = models.User;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { error } = require("console");
const JWT_SECRET = process.env.JWT_SECRET;
// const SESSION_SECRET = process.env.SESSION_SECRET; 

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

const sharp = require('sharp');


const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
});

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: '2010-12-01' })
});

async function sendValidationEmail(email, validationToken) {
  const mailOptions = {
    from: 'communityalis@gmail.com',
    to: email,
    subject: 'Email Validation',
    html: `<p>Click the following link to validate your email: <a href="http://localhost:3000/validate?token=${validationToken}">Validate Email</a></p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


app.post('/upload', upload.single('image'), (req, res) => {
  // Access the uploaded file using req.file
  const uploadedFile = req.file;
  console.log(uploadedFile)
  console.log(JSON.parse(req.body.pages))
  // Process the file as per your requirements
  // For example, you can store it in a database, perform validation, etc.

  // Send a response back to the client
  res.json({ message: 'File uploaded successfully!' });
});


// send the user one service
app.get("/get-one-service", async function (req, res) {
  try {
    const service_name = req.query.service;
    const service = await get_one_service(service_name);
    console.log('sending service:', service_name);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.json(service);
  } catch (error) {
    console.log(error);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.json({ success: false, error: 'internal server error' });
  }
});


app.post("/delete-service", DeleteService);
async function DeleteService(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    
    const service_name = req.query.service;
    const service = await get_one_service(service_name);
    
    if (service.user == username){
      
      const success = await delete_service(service_name);
      console.log(success);
      if (success){
        //console.log('service deleted by', username);
        res.json({success: true});
      }
      else{
        //console.log('problem deleting service from database');
        res.json({success: false, error: 'internal detabase error'});
      }
    }
    else{
      console.log(service.user, username)
      console.log('user does not own service!')
      res.json({ success: false, error: 'unauthorized' });
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: 'internal server error' });
  }
  // authorize user
}


app.post('/change_notification_status/:id', upload.none(), async function (req, res) {
  try {
    const message = await change_notification_status(req);
    if (message == 'success'){
      console.log('application from ', req.body.name,' is not longer new');
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ success: true }));
    }
    else{
      error('application notification was not able to change')
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: 'internal server error' });
  }
});

// send the user every service
app.get('/get-all-services', async function (req, res){
  //updateServicesWithThumbnails();
  try {
    var keywords = req.query.keyword;
    const all_services = await get_all_services(keywords, 'title thumbnail user');
    res.json(all_services);
    console.log("filtered services sent")
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: 'internal server error' });
  }
})

// Store user form data from an application in the database
app.post('/store-application', upload.none(), async function (req, res) {
  try {
    const message = await store_application(req);
    if (message == 'success'){
      console.log('application from ', req.body.name,' submitted');
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ success: true }));
    }
    else{
      error('application not subbmitted')
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: 'internal server error' });
  }
});

// get the applicants to a service (as long as the user is authorized)
app.get("/get-service-applicants", async function (req, res) {
  try {
    const service_name = req.query.service;
    const service = await get_one_service(service_name);

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    if (service && username && username == service.user){
      // the user owns this service
      const applicants = await get_service_applicants(service.title);
      res.json(applicants);
      console.log(applicants.length, 'applications sent for', service.title)
    }
    else{
      console.log('unauthorized request')
      res.json({ success: false, error: 'unauthorized' });
    }
    
  } catch (error) {
    console.log(error);
    res.json({
      dataServices: [],
      tokenUsername: 'not logged in'});
  }
})

app.get("/get-service-notifications", async function (req, res) {
  try {
    const service_name = req.query.service;
    const service = await get_one_service(service_name);

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    if (service && username && username == service.user){
      // the user owns this service
      const applicants = await get_service_applicants_notifications(service.title);
      res.json(applicants);
      console.log(applicants.length, 'applications sent for', service.title)
    }
    else{
      console.log('unauthorized request')
      res.json({ success: false, error: 'unauthorized' });
    }
    
  } catch (error) {
    console.log(error);
    res.json({
      dataServices: [],
      tokenUsername: 'not logged in'});
  }
})


app.post("/upload-service", upload.single("image"), storeService);
async function storeService(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const account = await User.findOne({ username }); 
    if (account){ 
      const success = await store_add_service(req, username);
      if (success){
        console.log('new service added by', username);
        res.json({success: true});
      }
      else{
        console.log('problem uploading service to database');
        res.json({success: false, error: 'internal detabase error'});
      }
    }
    else{
      console.log('account does not exist!')
      res.json({ success: false, error: 'unauthorized' });
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: 'internal server error' });
  }
  // authorize user
}

app.post("/edit-service", upload.array("files"), storeEditService);
async function storeEditService(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    
    const service_name = req.query.service;
    const service = await get_one_service(service_name);
    
    if (service.user == username){
      
      const success = await store_edit_service(req, username);
      console.log(success)
      if (success){
        console.log('service edited by', username);
        res.json({success: true});
      }
      else{
        console.log('problem uploading service to database');
        res.json({success: false, error: 'internal detabase error'});
      }
    }
    else{
      console.log(service.user, username)
      console.log('user does not own service!')
      res.json({ success: false, error: 'unauthorized' });
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: 'internal server error' });
  }
  // authorize user
  
  
}

app.use('/userdata', userRouter);

// service edit
app.get("/my-services/edit-service", function (req, res){
  prefill_service_edit(req, res);
});

// View aplications
app.get("/get-user-applicants", async function (req, res) {
  display_view_applicants(req, res);  
});

// login

app.post('/api/login', async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  console.log(usernameOrEmail);
  console.log(password);
  const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).lean()

  const userTest = await User.findOne({ $or: [{ username: "Adrean Cajigas" }, { email: "CS_mjc23" }] }).lean()
  console.log(userTest);

  console.log(user);
  if (!user) {
      return res.status(400).json({ status: 'error', error: 'Invalid username or email/password combination' })
  }

  if(await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
          { 
              id: user._id, 
              username: user.username,
              email: user.email 
          }, 
          JWT_SECRET
      )

      // set the cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 86400000 // 1 day
      })
      
      res.json({ status: 'ok', data: token })
      
  } else{
      res.status(400).json({ status: 'error', error: 'Invalid username or email/password combination' })
  }

})

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  console.log("logout");
  res.json({ status: 'ok', message: 'Logout successful' });
});

// POST /api/register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password: plainTextPassword, email } = req.body;
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ status: 'error', error: 'Invalid username' });
  }

  if (!email || !validEmailRegex.test(email)) {
    return res.status(400).json({ status: 'error', error: 'Invalid email' });
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.status(400).json({ status: 'error', error: 'Invalid password' });
  }

  if (plainTextPassword.length < 6) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Password should be at least 6 characters' });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  const verificationCode = Math.floor(1000 + Math.random() * 9000); // Generate a 4 digit verification code

  try {
    const response = await User.create({
      username,
      password,
      email,
      verified: false,
      verificationCode: verificationCode // Save the verification code in the database
    });

    console.log('User created successfully: ', response);

    // Send verification email to user
    const mailOptions = {
      from: 'communityalis@gmail.com', // Replace with your sender email address
      to: email,
      subject: 'Community ALI Verification',
      text: `Your verification code is: ${verificationCode}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key
      return res.json({ status: 'error', error: 'Username or Email already in use' });
    }
    throw error;
  }

  res.json({ status: 'ok' });
});

// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});