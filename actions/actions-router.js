const router = require("express").Router();
action = require("../data/helpers/actionModel.js");
project = require("../data/helpers/projectModel.js");

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

router.post("/:id");

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
