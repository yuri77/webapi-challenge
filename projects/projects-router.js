const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel.js");

router.use(express.json());

router.get("/", (req, res) => {
  db.get()
    .then(pro => {
      console.log(pro);
      res.status(200).json(pro);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

module.exports = router;
