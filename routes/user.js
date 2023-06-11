var express = require('express');
var router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const user_data = require('../controllers/userdata');

// send a user their notifications
router.get("/get-all-user-notifications", async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;
        const user_notifications = await user_data.get_all_user_notifications(username);
        res.json({
            notifications: user_notifications
        });
        // console.log('application notifications belonging to', username, 'sent')
    } catch (error) {
        console.log(error);
        res.json({
            user_notifications: [],
            tokenUsername: 'not logged in'
        });
    }
})

// send a user their services
router.get("/get-user-services", async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;
        const user_services = await user_data.get_services(username);

        res.json({
            dataServices: user_services,
            tokenUsername: username
        });
        console.log('services belonging to', username, 'sent')
    } catch (error) {
        console.log(error);
        res.json({
            dataServices: [],
            tokenUsername: 'not logged in'
        });
    }
})

router.get("/get-username", async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const username = decodedToken.username;

        res.json({ tokenUsername: username });

    } catch (error) {
        console.log(error);
        res.json({
            tokenUsername: 'not logged in'
        });
    }
});


module.exports = router;