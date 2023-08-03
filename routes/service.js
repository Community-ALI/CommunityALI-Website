const express = require('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const service_data = require('../controllers/servicedata');
const applicant_data = require("../controllers/applicant-data");

router.get("get-clubs-and-communites/:sort/:service_type/:categories", (req, res) => {
    res.send(service_data(req.params.sort, req.params.service_type, req.params.categories));
})

// send the user one service
router.get("/get-one-service", async function (req, res) {
    try {
        const service_name = req.query.service;
        const service = await service_data.get_one_service(service_name);
        console.log('sending service:', service_name);
        res.json(service);
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: 'internal server error' });
    }
});

// send the user every service
router.get('/get-all-services/:sorting/:serviceType/:categories', async function (req, res) {
    //updateServicesWithThumbnails();
    try {
        console.log(req.params);
        var keywords = req.query.keyword;
        const all_services =
            await service_data.get_all_services(keywords, 'title thumbnail pages',
                req.params.sorting, req.params.serviceType, req.params.categories);
        res.json(all_services);
        console.log("filtered services sent")
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: 'internal server error' });
    }
})

router.post("/delete-service", async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;

        const service_name = req.query.service;
        const service = await service_data.get_one_service(service_name);

        if (service.user == username) {

            const success = await service_data.delete_service(service_name);
            console.log(success);
            if (success) {
                console.log('service deleted by', username);
                res.json({ success: true });
            }
            else {
                console.log('problem deleting service from database');
                res.json({ success: false, error: 'internal detabase error' });
            }
        }
        else {
            console.log(service.user, username)
            console.log('user does not own service!')
            res.json({ success: false, error: 'unauthorized' });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: 'internal server error' });
    }
    // authorize user
});

router.post("/edit-service", upload.single("image"), storeEditService);
async function storeEditService(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;

        const service_name = req.query.service;
        const service = await service_data.get_one_service(service_name);
        if (service.user == username) {

            const success = await service_data.store_edit_service(req, username);
            console.log(success)
            if (success) {
                console.log('service edited by', username);
                res.json({ success: true });
            }
            else {
                console.log('problem uploading service to database');
                res.json({ success: false, error: 'internal detabase error' });
            }
        }
        else {
            console.log(service.user, username)
            console.log('user does not own service!')
            res.json({ success: false, error: 'unauthorized' });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: 'internal server error' });
    }
}

router.post("/upload-service", upload.single("image"), async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;
        const account = await User.findOne({ username });
        if (account) {
            const requestedServiceType = req.body.serviceType;
            if ((requestedServiceType == 'Club' && account.clubAdmin) || (requestedServiceType == 'Internship' && account.internshipAdmin)) {
                const success = await service_data.store_add_service(req, username);
                if (success) {
                    console.log(`new ${req.body.serviceType} added by ${username}`);
                    res.json({ success: true });
                }
                else {
                    console.log('problem uploading service to database');
                    res.json({ success: false, error: 'internal database error' });
                }
            }
            else {
                console.error(`${account.username} is not authorized to post ${requestedServiceType} services`)
                res.json({ success: false, error: 'unauthorized' });
            }

        }
        else {
            console.error('account does not exist')
            res.json({ success: false, error: 'unauthorized' });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: 'internal server error' });
    }
    // authorize user
});

router.get("/get-service-notifications", async function (req, res) {
    try {
        const service_name = req.query.service;
        const service = await service_data.get_one_service(service_name);

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;
        if (service && username && username == service.user) {
            // the user owns this service
            const applicants = await applicant_data.get_service_applicants_notifications(service.title);
            res.json(applicants);
            console.log(applicants.length, 'applications sent for', service.title)
        }
        else {
            console.log('unauthorized request')
            res.json({ success: false, error: 'unauthorized' });
        }

    } catch (error) {
        console.log(error);
        res.json({
            dataServices: [],
            tokenUsername: 'not logged in'
        });
    }
})
