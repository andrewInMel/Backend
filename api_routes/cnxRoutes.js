const express = require("express");
const router = express.Router();
const Connection = require("../models/cnxModel.js");
const isAuthenticated = require("./authMiddleware").isAuthenticated;

/* delete a connection */
router.delete("/:connectionId", isAuthenticated, async (req, res) => {
  const connectionId = req.params.connectionId;
  await Connection.findByIdAndDelete(connectionId);
  res.send("Connection deleted");
});

/* get all connections of an user  */
router.get("/", isAuthenticated, (req, res) => {
  Connection.find({ userId: req.query.userId })
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
  Connection.findById(req.params.connectionId)
    .then((connection) => {
      res.send(connection);
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong, please try later");
    });
});

/* update the detail of a single connection */
router.post("/update", isAuthenticated, (req, res) => {
  const connectionId = req.body.connectionId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const company = req.body.company;
  const occupation = req.body.occupation;
  const birthday = req.body.birthday;
  const vip = req.body.vip;
  const description = req.body.description;
  const imageSrc = req.body.imageSrc;
  const notes = req.body.notes;
  const tags = req.body.tags;
  const github = req.body.github;
  const instagram = req.body.instagram;
  const linkedIn = req.body.linkedIn;
  const twitter = req.body.twitter;
  /* update connection */
  Connection.updateOne(
    {
      _id: connectionId,
    },
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      company: company,
      occupation: occupation,
      birthday: birthday,
      vip: vip,
      description: description,
      imageSrc: imageSrc,
      notes: notes,
      tags: tags,
      github: github,
      instagram: instagram,
      linkedIn: linkedIn,
      twitter: twitter,
    }
  )
    .then((counts) => {
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
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userId = req.body.userId;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const company = req.body.company;
  const occupation = req.body.occupation;
  const birthday = req.body.birthday;
  const vip = req.body.vip;
  const description = req.body.description;
  const imageSrc = req.body.imageSrc;
  const notes = req.body.notes;
  const tags = req.body.tags;
  const github = req.body.github;
  const instagram = req.body.instagram;
  const linkedIn = req.body.linkedIn;
  const twitter = req.body.twitter;
  /* create new connection for the user */
  const newCnx = new Connection({
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    company: company,
    occupation: occupation,
    birthday: birthday,
    vip: vip,
    description: description,
    imageSrc: imageSrc,
    notes: notes,
    tags: tags,
    github: github,
    instagram: instagram,
    linkedIn: linkedIn,
    twitter: twitter,
  });
  await newCnx.save();
  res.send("new connection created");
});
module.exports = router;
