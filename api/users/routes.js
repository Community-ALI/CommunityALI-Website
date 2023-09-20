var express = require("express");
var router = express.Router();
const controllers = require("./controllers.js");
const _idController = require("./[_id]/controllers.js");

router.get("/", async function (req, res) {
  try {
    const users = await controllers.GET();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const user = await _idController.GET(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const user = await _idController.PUT(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
