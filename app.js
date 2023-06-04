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
app.use(bodyParser.urlencoded({ extended: false }));

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// get db
const get_all_services = require("./get-functions/get-all-services");
const get_one_service = require("./get-functions/get-one-service");

//authorized only get
const get_user_services = require("./get-functions/get-user-services")
const get_service_applicants = require("./get-functions/get-service-applicants")
const get_all_user_notifications = require("./get-functions/get-all-user-notifications.js")
const get_service_applicants_notifications = require("./get-functions/get-service-notification");
// no authorization needed set db
const store_application = require("./store-functions/store-application");

// authorized only set
const store_add_service = require('./store-functions/store-add-service');
const store_edit_service = require('./store-functions/store-edit-service');
const delete_service = require('./store-functions/delete-service');

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

// send the user every service
app.get('/get-all-services', async function (req, res){
  try {
    const all_services = await get_all_services();
    res.json(all_services);
    console.log("all services sent")
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

// send a user their services
app.get("/get-user-services", async function (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user_services = await get_user_services(username);
    
    res.json({
      dataServices: user_services,
      tokenUsername: username});
    console.log('services belonging to', username, 'sent')
  } catch (error) {
    console.log(error);
    res.json({
      dataServices: [],
      tokenUsername: 'not logged in'});
  }
})

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

// send a user their notifications
app.get("/get-all-user-notifications", async function (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const user_notifications = await get_all_user_notifications(username);
    
    res.json({
      notifications: user_notifications
    });
    console.log('application notifications belonging to', username, 'sent')
  } catch (error) {
    console.log(error);
    res.json({
      user_notifications: [],
      tokenUsername: 'not logged in'});
  }
})

// get the applicants to a service (as long as the user is authorized)
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


app.post("/upload-service", upload.array("files"), storeService);
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

//register
app.post('/api/register', async (req, res) => {
  const { username, password: plainTextPassword, email } = req.body
  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!username || typeof username !== 'string') {
      return res.status(400).json({ status: 'error', error: 'Invalid username' })
  }

  if(!email || !validEmailRegex.test(email)) {
      return res.status(400).json({ status: 'error', error: 'Invalid email' })
  }

  if(!plainTextPassword || typeof plainTextPassword !== 'string') {
      return res.status(400).json({ status: 'error', error: 'Invalid password' })
  }

  if(plainTextPassword.length < 6) {
      return res.status(400).json({ status: 'error', error: 'Password should be at least 6 characters' })
  }

  const password = await bcrypt.hash(plainTextPassword, 10)

  const verificationCode = Math.floor(1000 + Math.random() * 9000) // Generate a 4 digit verification code

  try{
      const response = await User.create({
          username,
          password,
          email,
          verified: false,
          verificationCode: verificationCode // Save the verification code in the database

      })
      console.log('User created successfully: ', response)
  } catch(error) {
      if (error.code === 11000) {
          //duplicate key
          return res.json({ status: 'error', error: 'Username or Email already in use' })
      }
      throw error
  }

  //Send verification email to user
  // const transporter = nodemailer.createTransport({
  //     host: 'smtp.office365.com',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //         user: AUTH_EMAIL,
  //         pass: AUTH_PASS
  //     }
  // });

  // const mailOptions =  {
  //     from: AUTH_EMAIL,
  //     to: email,
  //     subject: 'Email Verification',
  //     text: `Your verification code is: ${verificationCode}`
  // }
  
  // transporter.sendMail(mailOptions);

  // testing success
  // transporter.verify((error, success) => {
  //     if(error) {
  //         console.log(error);
  //     } else {
  //         console.log("Ready for messages");
  //         console.log(success);
  //     }
  // })

  res.json({ status: 'ok' })

  // res.redirect('/verification.html'); // Redirect to verification page

})

// Server configuration
const port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});