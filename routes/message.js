const express = require("express");
const router = express.Router();
const message_data = require("../controllers/message-data");
const sanitizeHtml = require("sanitize-html");

//TODO: Fix not returning anything
router.get("get-service-messages/:serviceId", async function (req, res) {
  serviceId = req.params.serviceId;
  try {
    const messages = await message_data.get_service_messages(serviceId);
    console.log(`Sending ${serviceId}'s messages`);
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "internal server error" });
  }
});

// TODO: develop message validation middleware
function validateMessage(req, res, next) {
  const messageContent = req.body.content;
  const messageTitle = req.body.title;
  if (typeof messageContent !== "string" || messageContent.trim().length <= 0) {
    return res.status(400).json({ error: "Invalid message body" });
  }
  if (typeof messageTitle !== "string" || messageTitle.trim().length <= 0) {
    return res.status(400).json({ error: "Invalid message title" });
  }
  next();
}

//TODO: sanitize post
router.post("post-message", validateMessage, async function (req, res) {
  const sanitizedObject = {
    title: sanitizeHtml(req.body.title.trim()),
    content: sanitizeHtml(req.body.content.trim()),
    createdAt: new Date(),
    sender: req.body.senderID,
  };
  try {
    message_data.save_service_message(sanitizedObject);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
