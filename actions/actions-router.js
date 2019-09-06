const router = require("express").Router();
action = require("../data/helpers/actionModel.js");
project = require("../data/helpers/projectModel.js");

router.use(require("express").json());

router.get("/:id", validateId, (req, res) => {
  const { id } = req.pro;
  project
    .getProjectActions(id)
    .then(actions => res.status(200).json(actions))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "action data cannot be retrieved" });
    });
});

router.post("/:id", validateId, (req, res) => {
  const { id } = req.pro;
  const { description, notes } = req.body;
  req.body.project_id = id;
  if (!description || !notes) {
    res.status(400).json({ error: "missing required field" });
  }
  action
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: "err posting to the database" });
    });
});

//custom middleware

function validateId(req, res, next) {
  const { id } = req.params;
  project.get(id).then(pro => {
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
