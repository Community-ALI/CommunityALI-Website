const express = require("express");
const router = express.Router();
const middleware = require("./middleware");
const { Token } = require("aws-sdk");
const jwt = require("jsonwebtoken");
const controllers = require("./controllers.js");
const serviceUserControllers = require("./[service][user]/controllers.js");

router.post("/", middleware.validateMessage, async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    const userId = decoded._id;
    const service = await Services.findById(req.body.sender).exec();
    // ensure the user has permission to send a message on behalf of the service
    if (service.user != username && service.UpdateSenders.includes(userId) == false) {
      console.log(service.user, username);
      return res.status(401).json({ error: "User is not the owner of the service" });
    }
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
