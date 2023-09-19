const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const { Token } = require("aws-sdk");
const jwt = require("jsonwebtoken");
const controllers = require("./controllers.js");
const serviceUserControllers = require("./[service][user]/controllers.js");

router.post("/", middleware.validateMessage, async function (req, res) {
  try {
    await controllers.POST(req.body);
    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:service/:user", async function (req, res) {
  try {
    const messages = await serviceUserControllers.GET(req.params.service, req.params.user);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
