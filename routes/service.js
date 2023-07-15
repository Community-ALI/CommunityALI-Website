const express = require('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const service_data = require('../controllers/servicedata');

router.get("get-clubs-and-communites/:sort/:service_type/:categories", (req, res) => {
    res.send(service_data(req.params.sort, req.params.service_type, req.params.categories));
})