const application_data = require("../controllers/applicant-data");
const express = require("express");
const router = express.router;

router.post('/change_notification_status/:id', upload.none(), async function (req, res) {
    try {
        const message = await change_notification_status(req);
        if (message == 'success') {
            console.log('application from ', req.body.name, ' is not longer new');
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ success: true }));
        }
        else {
            error('application notification was not able to change')
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: 'internal server error' });
    }
});

// Store user form data from an application in the database
app.post('/store-application', upload.none(), async function (req, res) {
    try {
        const message = await store_application(req);
        if (message == 'success') {
            console.log('application from ', req.body.name, ' submitted');
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({ success: true }));
        }
        else {
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