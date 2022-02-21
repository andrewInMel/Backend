const express = require("express");
const router = express.Router();
const Connection = require("../models/cnxModel.js");
const isAuthenticated = require("./authMiddleware").isAuthenticated;

/* delete a connection */
router.delete("/:connectionId", isAuthenticated, async (req, res) => {
  const doc = await Connection.findOneAndDelete({
    _id: req.params.connectionId,
    userId: req.session.passport.user,
  });
  if (doc) {
    res.send("Connection deleted");
  } else {
    res.send("Connection does not exist");
  }
});

/* get all connections of an user  */
router.get("/", isAuthenticated, (req, res) => {
  Connection.find({ userId: req.session.passport.user })
    .then((connections) => {
      res.send(connections);
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong, please try later");
    });
});

/* get the detail of a single connection */
router.get("/:connectionId", isAuthenticated, (req, res) => {
  Connection.findOne({
    _id: req.params.connectionId,
    userId: req.session.passport.user,
  })
    .then((connection) => {
      res.send(connection);
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong, please try later");
    });
});

/* update the detail of a single connection */
router.post("/update/:connectionId", isAuthenticated, (req, res) => {
  /* update connection */
  Connection.updateOne(
    {
      _id: req.params.connectionId,
      userId: req.session.passport.user,
    },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      company: req.body.company,
      occupation: req.body.occupation,
      birthday: req.body.birthday,
      vip: req.body.vip,
      description: req.body.description,
      imageSrc: req.body.imageSrc,
      notes: req.body.notes,
      tags: req.body.tags,
      github: req.body.github,
      instagram: req.body.instagram,
      linkedIn: req.body.linkedIn,
      twitter: req.body.twitter,
    }
  )
    .then((counts) => {
      console.log(counts);
      if (counts.matchedCount === 0) {
        res.send("Connection does not exist");
      } else {
        if (counts.modifiedCount === 0) {
          res.send(
            "Connection's detail updates failed, It may be because of the new detail is the same as the existing detail"
          );
        } else {
          res.send("Connection updated");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/* create a new connection */
router.post("/create", isAuthenticated, async (req, res) => {
  /* create new connection for the user */
  const newCnx = new Connection({
    userId: req.session.passport.user,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    company: req.body.company,
    occupation: req.body.occupation,
    birthday: req.body.birthday,
    vip: req.body.vip,
    description: req.body.description,
    imageSrc: req.body.imageSrc,
    notes: req.body.notes,
    tags: req.body.tags,
    github: req.body.github,
    instagram: req.body.instagram,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter,
  });
  const result = await newCnx.save();
  if (result) {
    res.send("New connection created");
  } else {
    res.send("something went wrong, please try later");
  }
});
module.exports = router;
