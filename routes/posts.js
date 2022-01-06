var express = require("express");
var router = express.Router();
const { PostModel } = require("../models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  PostModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", function (req, res, next) {
  PostModel.findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/", function (req, res, next) {
  PostModel.create(req.body)
    .then((data) => {
      res.json("Succes");
    })
    .catch((err) => res.status(500).json("err"));
});

router.delete("/", function (req, res, next) {
  console.log(req.query.id);
  PostModel.deleteOne({
    _id: req.query.id,
  })
    .then((data) => {
      res.json("Succes");
    })
    .catch((err) => res.status(500).json("err"));
});

module.exports = router;
