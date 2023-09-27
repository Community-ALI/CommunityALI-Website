const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const middleware = require("./middleware");

router.post("/", middleware.validateUserData, async (req, res) => {
  try {
    const user = req.body;
    controllers.POST(user);
    res.status(200).json({ status: "ok", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
