const express = require("express");
const router = express.Router();
const title_controller = require("./[title]/controllers.js");

// send the user one service
router.get("/:title", async function (req, res) {
  try {
    const service_name = req.params.title;
    const service = await title_controller.GET(service_name);
    console.log("sending service:", service_name);
    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

module.exports = router;