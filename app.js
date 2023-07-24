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
// allow the client to transfer data
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });

// get db
const get_all_services = require("./controllers/service-data");
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
const passwordReset = models.passwordReset;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { error } = require("console");
const JWT_SECRET = process.env.JWT_SECRET;
// const SESSION_SECRET = process.env.SESSION_SECRET; 



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
        console.log('service deleted by', username);
        res.json({success: true});
      }
      else{
        console.log('problem deleting service from database');
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
app.get('/get-all-services/:sorting/:serviceType/:categories', async function (req, res){
  //updateServicesWithThumbnails();
  try {
    var keywords = req.query.keyword;
    const all_services = 
      await get_all_services(keywords, 'title thumbnail pages',
      req.params.sorting, req.params.serviceType, req.params.categories);
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
      const requestedServiceType = req.body.serviceType;
      if ((requestedServiceType == 'Club' && account.clubAdmin) || (requestedServiceType == 'Internship' && account.internshipAdmin)){
        const success = await store_add_service(req, username);
        if (success){
          console.log(`new ${req.body.serviceType} added by ${username}`);
          res.json({success: true});
        }
        else{
          console.log('problem uploading service to database');
          res.json({success: false, error: 'internal database error'});
        }
      }
      else {
        console.error(`${account.username} is not authorized to post ${requestedServiceType} services`)
        res.json({ success: false, error: 'unauthorized'});
      }
      
    }
    else{
      console.error('account does not exist')
      res.json({ success: false, error: 'unauthorized'});
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, error: 'internal server error' });
  }
  // authorize user
}

app.post("/edit-service", upload.single("image"), storeEditService);
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
  const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).lean()
  if (!user) {
      return res.status(400).json({ status: 'error', error: 'Invalid username or email/password combination' })
  }
  if (!user.verified){
    return res.status(400).json({ status: 'unverified', username: user.username, error: 'Account has not been verified.' }) //FIXME: make a way to verify it
  }
  if(await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
          { 
              id: user._id, 
              username: user.username,
              email: user.email,
              platformManager: false,
              clubAdmin: user.clubAdmin,
              eventAdmin: user.eventAdmin,
              volunteeringAdmin: user.volunteeringAdmin,
              internshipAdmin: user.internshipAdmin
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

app.post('/api/verify', async (req, res) => {
  try{
    const username = req.query.username;
    const enteredCode = req.body.verificationCode;
    const user = await User.findOne({ username: username });
    if (user.verified){
      return res.status(400).json({ status: 'error', error: 'User is already verified' });
    }
    if (user.verificationCode === enteredCode){
      user.verified = true;
      await user.save();
      // log the user in now
      const token = jwt.sign(
        { 
            id: user._id, 
            username: user.username,
            email: user.email,
            platformManager: false,
            clubAdmin: user.clubAdmin,
            eventAdmin: user.eventAdmin,
            volunteeringAdmin: user.volunteeringAdmin,
            internshipAdmin: user.internshipAdmin
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
    }
    else{
      res.status(400).json({status: 'error', error: 'wrong code'})
    }
  }
  catch(error){
    console.log(error);
    res.status(400).json({status: 'error', error: 'error'});
  }
  
})

app.post('/api/resend-code', async (req, res) => {
  try{
    const username = req.query.username;
    console.log(username)
    const user = await User.findOne({ username: username });
    if (user.verified){
      return res.status(400).json({ status: 'error', error: 'User is already verified' });
    }
    const verificationCode = generateSixDigitCode()
    sendEmail(user.email, 'Verification Code', `Your six digit verification code is: ${verificationCode}.`)
    user.verificationCode = verificationCode;
    user.save();
    res.json({status: 'ok'});
  }
  catch(error){
    console.log(error);
    res.status(400).json({status: 'error', error: 'error'});
  }
})

app.post('/api/delete-unverified-account', async (req, res) => {
  try{
    const username = req.query.username;
    
    const user = await User.findOne({ username: username });
    if (user.verified){
      return res.status(400).json({ status: 'error', error: 'User is already verified' });
    }
    user.delete();
    console.log('delete', username);
    res.json({status: 'ok'});
  }
  catch(error){
    console.log(error);
    res.status(400).json({status: 'error', error: 'error'});
  }
})




app.post('/api/forgot-password', async (req, res) => {
  try{
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user){ // the user account with this email exists
      const token = await generateRandomToken(32); // generate a cryptographically secure 32 character hexadecimal code
      const newReset = new passwordReset({
        email: email,
        token: token
      });
  
      await newReset.save(); 
      sendEmail(email, 'Forgot password', `A password reset has been requested for the account associated with this email. If you did not request this email, you can safely ignore it. Otherwise, if you meant to send this email, your link to reset your password is: localhost:8080/reset-password?token=${token}`)
      res.json({status: 'ok'})
    }
    else{
      res.status(400).json({status: 'error', error: 'email not associated with an account'});
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json({status: 'error', error: err});
  }
})

// this one is for people who remember their old password (rename in the rewrite)
app.post('/api/change-password', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user = await User.findOne({ username: username });
    const oldPassword = req.body.oldPassword;
    if(await bcrypt.compare(oldPassword, user.password)) {
      // the username, password combination is successful
      plainTextPassword = req.body.newPassword;
      if (plainTextPassword.length < 6) {
        return res.status(400).json({ status: 'error', error: 'Password should be at least 6 characters' });
      }
    
      const newPassword = await bcrypt.hash(plainTextPassword, 10);
      user.password = newPassword;
      await user.save();
      console.log('password updated');
      res.json({status: 'ok'})
    }
    else{
      res.status(400).json({status: 'error', error: 'Incorrect password'})
    }
    

  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', error: 'Something went wrong' });
  }
});

// this one is for people who don't remember their old password (rename in the rewrite)
app.post('/api/update-password', async (req, res) => {
  try {
    const token = req.query.token;
    const plainTextPassword = req.body.password;
    
    // Find the corresponding password reset entry in the database
    const resetEntry = await passwordReset.findOne({ token: token });
    
    if (resetEntry) {
      const email = resetEntry.email;
      
      // Find the user associated with the email in the reset entry
      const user = await User.findOne({ email: email });
      
      if (user) {
        // Hash the new password with bcrypt
        const password = await bcrypt.hash(plainTextPassword, 10);
        
        // Update the user's password in the database
        user.password = password;
        await user.save();
        
        // Delete the password reset entry from the database
        await passwordReset.deleteOne({ token: token });
        
        return res.json({ status: 'ok', message: 'Password updated successfully' });
      } else {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }
    } else {
      return res.status(400).json({ status: 'error', error: 'Invalid or expired token' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', error: 'Something went wrong' });
  }
});

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

  // verify
  const verificationCode = generateSixDigitCode()
  
  try {
    const response = await User.create({
      username,
      password,
      email,
      verified: false,
      verificationCode: verificationCode,
      clubAdmin: false, // Set default value for clubAdmin
      internshipAdmin: false, // Set default value for internshipAdmin
      dateCreated: new Date().toISOString() // Store the current date/time as ISO string
    });
    sendEmail(email, 'Verification Code', `Your six digit verification code is: ${verificationCode}.`)

    console.log('User created successfully: ', response);

    
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      // Duplicate key
      console.log('username/email in use')
      return res.json({ status: 'error', error: 'Username or Email already in use' });
    }
    throw error;
  }
  return res.json({status: 'ok'})
});


//last route, important for frontend I believe
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});