const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel.js");

router.use(express.json());

router.get("/", (req, res) => {
  db.get()
    .then(pro => {
      //console.log(pro);
      res.status(200).json(pro);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: "Please provide name and description for the project"
    });
  }
  db.insert({ name, description })
    .then(pro => {
      res.status(201).json(pro);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "There was an error saving the post to database" });
    });
});

module.exports = router;
