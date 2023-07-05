const express = require('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const service_data = require('../controllers/servicedata');

router.get("get-clubs-and-communites/:sort", (req, res) => {
    res.send(service_data(req.params.sort));
})