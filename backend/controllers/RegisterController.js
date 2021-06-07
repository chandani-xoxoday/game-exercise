const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/UserModel");

const register = (req, res) => {
  const user = new db.User({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err) => {
    if (err) {
      if (err.keyPattern.userName === 1) {
        return res.status(401).send("Username already exists");
      } else if (err.keyPattern.email === 1) {
        return res.status(401).send("Email already exists");
      } else {
        return res.status(500).send({ message: err });
      }
    }
    user.save((err) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      var token = jwt.sign({ id: user.id }, 'abc', {
        expiresIn: 86400, // 24 hours
      });

      var token = jwt.sign({ id: user.id }, 'abc', {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        id: user._id,
        userName: user.userName,
        accessToken: token,
      });
    });
  });
};

module.exports = {
  register,
};
