const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets.js");
const Users = require("../users/users-model.js");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password, username } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  if (email && password && username) {
    Users.insert({ email, password: hash, username })
      .then(user => {
        token = generateToken(user);
        res.status(201).json({ user, token });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: "Could not register user, try again", err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Must provide email, password and username" });
  }
});

router.post("/login", (req, res) => {
  const { email, password, username } = req.body;

  if ((email && password, username)) {
    console.log("userTest:", email, password, username);
    Users.getByEmail(email)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ user, token });
        } else {
          res
            .status(401)
            .json({ message: "Invalid email or password or username" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not log in" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Must provide email, password and username" });
  }
});

router.get("/users", (req, res) => {
  Users.get()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

// get users for edit profile
router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  Users.getById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Updating user", err });
    });
});

// update users for edit profile
router.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Users.updateUser(id, changes)
    .then(users => {
      res.status(200).json({ message: `user ${id} updated!`, users });
    })
    .catch(err => {
      res.status(500).json({ message: "Error Updating user", err });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
  };
  const options = {
    expiresIn: "30d"
  };
  return jwt.sign(payload, secrets.environment, options);
}

module.exports = router;
