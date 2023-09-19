const express = require("express");
const router = express.Router();
const message_data = require("../controllers/message-data");

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


module.exports = router;
