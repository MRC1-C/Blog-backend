var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

router.get("/", function (req, res, next) {
  let [scheme, token] = req.headers.authorization.split(" ");
  UserModel.findOne({ _id: jwt.verify(token, "mk")._id })
    .then((data) => {
      res.json({ userName: data?.userName });
    })
    .catch((err) => console.log(err));
});

router.post("/register", function (req, res, next) {
  UserModel.findOne({ userName: req.body.userName })
    .then((data) => {
      if (data) {
        res.json("already exist");
      } else {
        UserModel.create(req.body)
          .then((data) => {
            res.json("Succes");
          })
          .catch((err) => res.status(500).json("err"));
      }
    })
    .catch((err) => res.status(500).json("err"));
});

router.post("/login", function (req, res, next) {
  UserModel.findOne(req.body)
    .then((data) => {
      if (data) {
        var accessToken = jwt.sign(
          {
            _id: data._id,
          },
          "mk"
        );
        res.json({
          message: "Succes",
          accessToken: accessToken,
        });
      } else {
        res.status(500).json("err");
      }
    })
    .catch((err) => res.status(500).json("err"));
});

router.delete("/", function (req, res, next) {
  UserModel.deleteOne({
    _id: req.query.id,
  })
    .then((data) => {
      res.json("Succes");
    })
    .catch((err) => res.status(500).json("err"));
});

module.exports = router;
