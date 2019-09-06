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

router.put("/:id", validateId, (req, res) => {
  const { id } = req.pro;
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: "Please provide name and description for the project"
    });
  }
  db.update(id, { name, description })
    .then(pro => {
      res.status(201).json(pro);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "project couldn't be updated" });
    });
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.pro;

  db.remove(id)
    .then(del => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error deleting project" });
    });
});

//custom middleware

function validateId(req, res, next) {
  const { id } = req.params;
  db.get(id).then(pro => {
    if (pro) {
      //console.log("pro from middle", pro);
      req.pro = pro;
      next();
    } else {
      res.status(404).json({ error: "project with id does not exist" });
    }
  });
}

module.exports = router;
