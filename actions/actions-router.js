const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("get to /actions");
});

module.exports = router;
