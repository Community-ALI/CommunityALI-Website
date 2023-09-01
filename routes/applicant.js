const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const applicant_data = require("../controllers/applicant-data");
const service_data = require("../controllers/service-data");
const { ObjectId } = require('mongodb');

router.post('/change_notification_status/:id', async function (req, res) {
    try {
        const message = await applicant_data.change_notification_status(req);
        if (message == 'success') {
            console.log('application from ', req.params.id, ' is not longer new');
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ success: true }));
        }
        else {
            error('application notification was not able to change')
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: 'internal server error' });
    }
});

// Store user form data from an application in the database
router.post('/store-application', upload.none(), async function (req, res) {
    try {
        const message = await applicant_data.store_application(req);
        if (message.success) {
            console.log('application from ', req.body.name, ' submitted');
            res.setHeader("Content-Type", "application/json");
            // add the application to the service's list of applicants using the application id
            const service = await service_data.get_one_service(req.body.service);
            service.applicants.push(new ObjectId(message.application_id));
            await service.save();
            res.send(JSON.stringify({ success: true }));
        }
        else {
            console.log(message.error);
            res.json({ success: false, error: message.error });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: 'internal server error' });
    }
});

// get the applicants to a service (as long as the user is authorized)
router.get("/get-service-applicants", async function (req, res) {
    try {
      const service_name = req.query.service;
      const service = await service_data.get_one_service(service_name);
  
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const username = decodedToken.username;
      if (service && username && username == service.user){
        // the user owns this service
        const applicants = await applicant_data.get_service_applicants(service.title);
        // console.log(applicants);
        res.json(applicants);
        console.log(applicants.length, 'applications sent for', service.title);
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

  // delete an application from the database
router.post('/delete-application', async function (req, res) {
    try {
        const service_name = req.body.service;
        // make sure the user owns the service
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const adminUsername = decodedToken.username;
        const service = await service_data.get_one_service(service_name);
        if (service.user != adminUsername){
            res.json({ success: false, error: 'Unauthorized' });
        }
        // get the username of the applicant
        const username = req.body.username;
        const message = await applicant_data.remove_applicant(service_name, username);
        if (message.success) {
            // TODO: email the applicant that their application has been rejected
            console.log('application from ', req.body.username, ' rejected');
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ success: true }));
        }
        else {
            error(message.error)
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: 'internal server error' });
    } 
});

module.exports = router;