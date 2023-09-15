var express = require("express");
var router = express.Router();
const controllers = require("./controllers.js");

router.get("/", async function (req, res) {
  try {
    const users = await controllers.GET();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
