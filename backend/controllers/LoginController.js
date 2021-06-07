const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../models/UserModel");

const login = (req, res) => {
  db.User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(401).send("User Not found.");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send("Invalid Password.");
      }

      var token = jwt.sign({ id: user.id }, 'abc', {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        id: user._id,
        userName: user.userName,
        accessToken: token,
      });
    });
};

module.exports = {
  login,
};
