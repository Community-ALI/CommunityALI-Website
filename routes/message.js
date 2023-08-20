const express = require("express");
const router = express.Router();
const message_data = require("../controllers/message-data");
const sanitizeHtml = require("sanitize-html");

router.get("/get-service-messages/:serviceId", async function (req, res) {
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
  const messageContent = req.body.content;
  const messageTitle = req.body.title;
  if (typeof messageContent !== "string" || messageContent.trim().length <= 0) {
    console.log('Invalid message body');
    return res.status(400).json({ error: "Invalid message body" });
  }
  if (typeof messageTitle !== "string" || messageTitle.trim().length <= 0) {
    console.log('Invalid message title');
    return res.status(400).json({ error: "Invalid message title" });
  }
  next();
}

router.post("/post_message", validateMessage, async function (req, res) {
  const sanitizedObject = {
    title: sanitizeHtml(req.body.title.trim()),
    content: sanitizeHtml(req.body.content.trim()),
    createdAt: new Date(),
    sender: req.body.senderID,
  };
  try {
    await message_data.save_service_message(sanitizedObject);
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
