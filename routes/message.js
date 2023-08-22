const express = require("express");
const router = express.Router();
const message_data = require("../controllers/message-data");
const sanitizeHtml = require("sanitize-html");

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
  const sanitizedObject = {
    content: sanitizeHtml(req.body.content.trim()),
    createdAt: new Date(),
    sender: req.body.senderId,
  };
  try {
    await message_data.save_service_message(sanitizedObject);
    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
