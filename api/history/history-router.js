const express = require("express");
const History = require("./history-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  History.get()
    .then(items => res.status(200).json(items))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve history" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  History.getById(id)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res
          .status(404)
          .json({ message: "Could not find history with that id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve history" });
    });
});

router.post("/", (req, res) => {
  const { user_id, asset_id } = req.body;

  if (user_id && asset_id) {
    History.insert(req.body)
      .then(item => res.status(201).json(item))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not post history" });
      });
  } else {
    res
      .status(400)
      .json({
        message: "Must include user_id, asset_id, time_in, and time_out"
      });
  }
});

module.exports = router;
