const asyncHandler = require("express-async-handler");
const db = require("../models/UserModel");

const updateUserById = asyncHandler(async (req, res) => {
  const { score, gameDate } = req.body;
  db.User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.games.gameDate === gameDate) {
      if (user.games.gameCounter < 10) {
        user.games.highestScore = Math.max(user.games.highestScore, score);
        user.games.gameCounter += 1;
      } else {
        return res.status(200).send({
          message: "Maxed Game attempts",
          games: user.games,
        });
      }
    } else {
      user.games.highestScore = Math.max(user.games.highestScore, score);
      user.games.gameCounter = 1;
      user.games.gameDate = gameDate;
    }
    user.save().then(() => {
      return res.status(200).send({
        message: "Game successfully updated",
        games: user.games,
      });
    });
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { gameDate } = req.body;
  db.User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.games.gameDate === gameDate) {
      return res.status(200).send({
        userName: user.userName,
        games: user.games,
      });
    } else {
      if (user.games.gameCounter != 0) {
        user.games.gameCounter = 0;
      }
      user.save().then(() => {
        return res.status(200).send({
          userName: user.userName,
          games: user.games,
        });
      });
    }
  });
});

module.exports = {
  updateUserById,
  getUserById,
};
