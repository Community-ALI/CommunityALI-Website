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

// fs allows the server to read html from the client. I think?
const fs = require('fs');

//react stuff
var React = require('react');
var ReactDomServer = require('react-dom/server');

<<<<<<< HEAD
// connect to database
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/application-DB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://Community_Catalyst:catalyst_2022@cluster0.parasjl.mongodb.net/test", {useNewUrlParser: true});
// create format for entering applications
const applicationSchema = {
    service: String,
    name: String,
    email: String,
    w_number: String
}
// create format for entering services
const serviceSchema = {
  title: String,
  author: String,
  author_role: String,
  photo: String,         // FIXME: make photo an image file not string
  details: Array,
  description: String,
  contacts: Array
=======
//authorized only get
const get_user_services = require("./get-functions/get-user-services")
const get_service_applicants = require("./get-functions/get-service-applicants")
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
>>>>>>> publishment-main
}

// connect to a specific part of the database (application-DB.applications)
const Application = mongoose.model("applications", applicationSchema);
const Services = mongoose.model("services", serviceSchema);
// require js modules
var database_search = require('./database-search.js');
var service_page_display = require("./service-page-display");
var application_page_display = require("./application-page-display");
// fire when an application form is submitted
app.post('/send-application', upload.none(), function (req, res) {

    // create json data from form
    const apply = new Application({
      service: req.body.service,
      name: req.body.name,
      email: req.body.email,
      w_number: req.body.w_number
    });
    // save json data to the database
    apply.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        // display success page
        console.log('application success');
        res.send("/signup-success.html");
      }
    });
  });


// send user to index page when they search our website url
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

<<<<<<< HEAD
app.get("/service-search", function (req, res) {
  var keyword = req.query.keyword;
  var filter = req.query.filter;
=======

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
>>>>>>> publishment-main

  // get database data
  Services.find(function(err, foundServices){
    if(!err){      
      // TODO: perform the search using the keyword and filter
      filteredData = foundServices;
      //res.render(service_page_display({ results: filteredData }));

      fs.readFile('public/services.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // var "data" now contains the contents of the file
        var html = ReactDomServer.renderToString(React.createElement(service_page_display, { results: filteredData }));
        let divToReplace = '<div class ="results"></div>';
        let newDivContent = html

        let newData = data.replace(divToReplace, newDivContent);

        res.send(newData);
        });
      };

  
  });
});


app.get("/apply-for-service", function (req, res) {
  var selected_service = req.query.service;

<<<<<<< HEAD
  console.log(selected_service);
  // get database data
  Services.find(function(err, foundServices){
    if(!err){
      // find this exact service
      console.log('Found service:');
      var selected_service_json = 'ERROR: no service found'
      for (service of foundServices){
        if (service.title == selected_service) {
          selected_service_json = service;
        }
=======



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
>>>>>>> publishment-main
      }
      console.log(selected_service_json);
      
<<<<<<< HEAD

      fs.readFile('public/apply-for-service.html', 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const window = domino.createWindow(data);
        // get the document from the window
        const document = window.document;
        // find the element with class "service-title" and set it to the title
        const title = document.querySelector('.service-title');
        title.innerHTML = selected_service_json.title;
        // find the element with class "service-picture" and set it to the image
        const image = document.querySelector('.service-picture');
        image.innerHTML = '<img class="MANRRS-picture" src ="../'+selected_service_json.photo+'"></img>' 

        // create details array
        detailsHTML = '<div class="service-author"></div><div class="service-header">Next Meeting Details</div>';
        for (detail of selected_service_json.details){
          detailsHTML+='<div>'
          detailsHTML+=detail;
          detailsHTML+='</div>'
        };
        // find the element with class "service-details" and set it to the service details
        const details = document.getElementById('service-details');
        details.innerHTML = detailsHTML;

        // find the element with class "service-author" and set it to the author
        const author = document.querySelector('.service-author');
        author.innerHTML = selected_service_json.author;

        // find the element with class "service-description" and set it to the description
        const description = document.querySelector('.service-description');
        description.innerHTML = selected_service_json.description;


        contactHTML = '<div class="service-author"></div><div class="service-header">Contact and Social Media</div>';
        for (contact of selected_service_json.contacts){
          contactHTML+='<div>'
          contactHTML+=contact;
          contactHTML+='</div>'
        };
        // find the element with ID "contact-container" and set it to the service details
        const contacts = document.getElementById('contact-container');
        contacts.innerHTML = contactHTML;

        // send the modified HTML to the client
        res.send(window.document.documentElement.outerHTML);
        });
      };

  
  });
});


// see aplications
// app.get("/Applications", function (req, res) {
//   var keyword = req.query.keyword;
//   var filter = req.query.filter;

//   // get database
//   Application.find(function(err, foundServices){
//     if(!err){
//       console.log(foundServices[0].name);
      
//       // perform the search using the keyword and filter
//       filteredData = foundServices;
//       //res.render(service_page_display({ results: filteredData }));
//       // res.sendFile(__dirname +'/public/index.html')
//       fs.readFile('public/services.html', 'utf-8', (err, data) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         // data now contains the contents of the file
//         var html = ReactDomServer.renderToString(React.createElement(application_page_display, { results: filteredData }));
//         let divToReplace = '<div class ="results"></div>';
//         let newDivContent = '<div id="target">' + html + '</div>';

//         let newData = data.replace(divToReplace, newDivContent);

//         res.send(newData);

//         });
//       };

  
//   });
// });


let port = process.env.PORT; 
if ( port == null || port == ""){
  port = 3000;
}

=======
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

>>>>>>> publishment-main
app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});