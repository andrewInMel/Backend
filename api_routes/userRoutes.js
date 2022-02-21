const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Connection = require("../models/cnxModel.js");
const Task = require("../models/taskModel");
const genPassword = require("../encryption/passwordEncrypt").genPassword;
const userAuthenticated = require("./authMiddleware").userAuthenticated;

/* update user's password */
router.post("/password/:userId", userAuthenticated, (req, res) => {
  /* generate password hash */
  const { hash, salt } = genPassword(req.body.password);
  /* update salt and hash */
  User.updateOne({ _id: req.params.userId }, { hash: hash, salt: salt })
    .then((counts) => {
      if (counts.matchedCount === 0) {
        res.send("User does not exist");
      } else {
        if (counts.modifiedCount === 0) {
          res.send(
            "Password updates failed, It may be because of the new detail is the same as the existing detail"
          );
        } else {
          res.send("Password updated");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* delete a user */
router.delete("/:userId", userAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  await Task.deleteMany({ userId: userId });
  await Connection.deleteMany({ userId: userId });
  await User.findByIdAndDelete(userId);
  res.send("User's account is deleted");
});

/* get user's detail */
router.get("/:userId", userAuthenticated, (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      console.log(err);
      res.send("something went wrong, please try later");
    } else {
      if (user) {
        res.send(user);
      } else {
        res.send("The user does not exist");
      }
    }
  });
});

/* update user's detail */
router.post("/update/:userId", userAuthenticated, (req, res) => {
  User.findOne({ email: req.body.email })
    .then((oneUser) => {
      /* check if email address is registered by other user */
      if (oneUser && oneUser._id.toString() !== req.params.userId) {
        res.status(401).json("Email is already registered by other user");
      } else {
        /* update user's detail */
        User.updateOne(
          { _id: req.params.userId },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            company: req.body.company,
            occupation: req.body.occupation,
            birthday: req.body.birthday,
            description: req.body.description,
            imageSrc: req.body.imageSrc,
            notes: req.body.notes,
            email: req.body.email,
          }
        )
          .then((counts) => {
            if (counts.matchedCount === 0) {
              res.send("User does not exist");
            } else {
              if (counts.modifiedCount === 0) {
                res.send(
                  "User's detail updates failed, It may be because of the new detail is the same as the existing detail"
                );
              } else {
                res.send("User's detail updated");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

/* user register */
router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        res.send("user already exist");
      } else {
        /* generate password hash */
        const { hash, salt } = genPassword(password);
        /* create a new user & store it in database */
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: email,
          hash: hash,
          salt: salt,
        });
        await newUser.save();
        res.send("user created");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
