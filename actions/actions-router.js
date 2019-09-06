const router = require("express").Router();
action = require("../data/helpers/actionModel.js");
project = require("../data/helpers/projectModel.js");

router.use(require("express").json());

router.get("/", (req, res) => {
  action
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: "couldnt retrieve actions information" });
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

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.act;
  action
    .remove(id)
    .then(act => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "cannot be deleted" });
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

function validateActionId(req, res, next) {
  const { id } = req.params;
  action.get(id).then(act => {
    if (act) {
      req.act = act;
      next();
    } else {
      res.status(404).json({ error: "action with id does not exist" });
    }
  });
}

module.exports = router;
