const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const { Token } = require("aws-sdk");
const jwt = require("jsonwebtoken");
const controllers = require("./controllers.js");

router.post("/", middleware.validateMessage, async function (req, res) {
  try {
    await controllers.POST(req.body);
    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
