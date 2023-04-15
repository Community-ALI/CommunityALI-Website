
// Require the neccesary libraries and modules 
// set up express
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow the client to transfer data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const display_services = require("./display-files/display-services");
const display_all_applications = require("./display-files/display-all-applications");
const display_application_page = require("./display-files/display-application-page");
const display_my_services = require("./display-files/display-my-services")

const store_application = require("./display-files/store-application");
const store_service = require("./display-files/store-service");
const store_images = require("./store-image");
const display_service_edit_page = require("./display-files/service-edit");
const store_edited_service = require("./display-files/database-service-edit");

const models = require("./define-database-models");
const User = models.User;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
// const SESSION_SECRET = process.env.SESSION_SECRET; 




// send user to index page when they search our website url
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Store user form data from an application in the database
app.post('/send-application', upload.none(), function (req, res) {
    store_application(req, res);
  });

// test: this uploads images
app.post("/upload-files", upload.array("files"), uploadFiles);
function uploadFiles(req, res) {
  store_images(req, res)
}


app.post("/upload-service", upload.array("files"), storeService);
function storeService(req, res) {
  try{
    if (req.headers.authorization != undefined){
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log('service upload')
      store_service(req, res, decodedToken);
    }
    else{
      console.log('error, login verification failed')
      res.send("error, login verification failed");
    }
  }
  catch (error){
    console.log(error)
    res.send("error");
  }
}

app.post("/upload-edited-service", upload.array("files"), editService);
function editService(req, res) {
  try{
    if (req.headers.authorization != undefined){
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log('service edit')
      store_edited_service(req, res, decodedToken);
    }
    else{
      console.log('error, login verification failed')
      res.send("error, login verification failed");
    }
  }
  catch (error){
    console.log(error)
    res.send("error");
  }
}

// Display services from the database to the user when they go to the service-search page
app.get("/service-search", function (req, res) {
    display_services(req,res);
});

// display the sign up/apply for service page
app.get("/apply-for-service", function (req, res) {
  
  display_application_page(req,res);
  
});

// service edit
app.get("/service-edit", function (req, res){
  display_service_edit_page(req, res);
});

// View aplications
app.get("/Applications", async function (req, res) {
  try{
  if (req.headers.authorization != undefined){
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log('application request')
    display_all_applications(req, res, decodedToken);  
    console.log('applications sent')
  }
  else{
    console.log('error, login verification failed')
    res.send("error, login verification failed");
  }
  }
  catch (error){
    console.log(error)
    res.send("error");
  }
});

app.get("/view-my-services", async function (req, res) {
  try{
  if (req.headers.authorization != undefined){
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log('my services request')
    display_my_services(req, res, decodedToken);  
    console.log('my services sent')
  }
  else{
    console.log('error, login verification failed')
    res.send("error, login verification failed");
  }
  }
  catch (error){
    console.log(error)
    res.send("error, server issue. If this issue persists please contact us, we are actively working on a solution.");
  }
});




// login

app.post('/api/login', async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  console.log(usernameOrEmail);
  const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).lean()
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