const db = require("../models");

verifyLogin = (req, res, next) => {
  // Username
  db.findOne({
    userName: req.body.userName,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Username is already in use!" });
      return;
    }

    // Email
    db.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Email is already in use!" });
        return;
      }

      next();
    });
  });
};

module.exports = {
  verifyLogin,
};
