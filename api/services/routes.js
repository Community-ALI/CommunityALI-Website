const express = require("express");
const router = express.Router();
const title_controller = require("./[_id]/controllers.js");

// send the user one service
router.get("/:_id", async function (req, res) {
  try {
    const _id = req.params._id;
    const service = await title_controller.GET(_id);
    console.log("sending service:", _id);
    res.status(200).json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

module.exports = router;