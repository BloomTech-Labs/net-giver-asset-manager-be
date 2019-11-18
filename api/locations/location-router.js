const express = require("express");
const Location = require("./location-model");
const router = express.Router();

router.get("/demo", (req, res) => {
  res.status(200).send("LOCATION AREA");
});

router.get("/", (req, res) => {
  Location.get()
    .then(items => res.status(200).json(items))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not find locations" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Location.getById(id)
    .then(locModel => {
      res.json(locModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not find location" });
    });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  console.log("data info ", req.body);
  if (name) {
    Location.add(req.body)
      .then(location => res.status(201).json(location))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not add location" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Must include name and location" });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Location.update(id, changes)
    .then(Location => {
      res.status(200).json({ message: `location ${id} updated!` });
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating location" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Location.remove(id)
    .then(Location => {
      res
        .status(200)
        .json({ message: `location ${id} is permanently deleted!` });
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting location" });
    });
});

module.exports = router;
