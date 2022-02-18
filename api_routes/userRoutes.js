const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const genPassword = require("../encryption/passwordEncrypt").genPassword;
const isAuthenticated = require("./authMiddleware").isAuthenticated;

/* update password */
router.post("/password/:userId", isAuthenticated, (req, res) => {
  const newPassword = req.body.password;
  /* generate password hash */
  const { hash, salt } = genPassword(newPassword);
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
router.delete("/:userId", isAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  const deletedUser = await User.findByIdAndDelete(userId);
  if (deletedUser) {
    res.send("User deleted");
  } else {
    res.send("User deletion failed");
  }
});

/* get user's detial */
router.get("/:userId", isAuthenticated, (req, res) => {
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
router.post("/update", isAuthenticated, (req, res) => {
  const userId = req.body.userId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  //  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const company = req.body.company;
  const occupation = req.body.occupation;
  const birthday = req.body.birthday;
  const description = req.body.description;
  const imageSrc = req.body.imageSrc;
  const notes = req.body.notes;
  User.updateOne(
    { _id: userId },
    {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: address,
      company: company,
      occupation: occupation,
      birthday: birthday,
      description: description,
      imageSrc: imageSrc,
      notes: notes,
      email: email,
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
          res.send("User updated");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* sign up*/
router.post("/register", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
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
          firstName: firstName,
          lastName: lastName,
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
