const express = require("express");
const router = express.Router();
const message_data = require("../controllers/message-data");
const sanitizeHtml = require("sanitize-html");
const { Token } = require("aws-sdk");
const jwt = require('jsonwebtoken');

router.get("/get_service_messages/:serviceId", async function (req, res) {
  console.log("attempting to send messages...");
  serviceId = req.params.serviceId;
  try {
    const messages = await message_data.get_service_messages(serviceId);
    console.log(`Sending ${serviceId}'s messages`);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "internal server error" });
  }
});

function validateMessage(req, res, next) {
  const messageContent = sanitizeHtml(req.body.content.trim());
  console.log(req.body);
  if (typeof messageContent !== "string" || messageContent.length <= 0) {
    console.log("Invalid message body: ", messageContent);
    return res
      .status(400)
      .json({ error: `${messageContent} is an invalid message body` });
  }
  next();
}

router.post("/post_message", validateMessage, async function (req, res) {
  try {
    const sanitizedObject = {
      content: sanitizeHtml(req.body.content.trim()),
      createdAt: new Date(),
      sender: req.body.senderId,
    };
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const username = decodedToken.username;
    const user_id = decodedToken._id;
    // check if the user owns or manages the service
    const service = await Services.findById(sanitizedObject.sender).exec();
    if (!service) {
      console.log('invalid service id');
      return res.status(400).json({ error: "Invalid service ID" });
    }
    if (!service.user === username && !(service.UpdateSenders && service.UpdateSenders.includes(user_id))) {
      console.log('unauthorized');
      return res.status(403).json({ error: "You do not have permission to send a message to this service" });
    }

    await message_data.save_service_message(sanitizedObject);
    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
