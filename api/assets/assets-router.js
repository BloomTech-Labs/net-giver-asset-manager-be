const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const assetsModel = require("./assets-model");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/img', (req, res) => {
  assetsModel.getAssetImages()
    .then(images => res.status(200).json(images))
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Could not retrieve images'});
    });
});

server.get("/img/:id", (req, res) => {
  const { id } = req.params;
  assetsModel
    .getAssetImageById(id)
    .then(image => res.status(200).json(image))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve image" });
    });
});

// post asset image
server.post("/img", (req, res) => {
  const { location, asset_img_id } = req.body;
  if (location && asset_img_id) {
    assetsModel
      .insertImage(req.body)
      .then(image => res.status(201).json(image))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not post image" });
      });
  } else {
    res.status(400).json({ message: "Must include location and asset_img_id" });
  }
});

server.get("/", (req, res) => {
  assetsModel
    .getAssets()
    .then(assetsModel => {
      res.status(200).json(assetsModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not get retrieve assets" });
    });
});

server.get("/:id", (req, res) => {
  const id = req.params.id;

  assetsModel
    .getAsset(id)
    .then(assetModel => {
      res.status(200).json(assetModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve asset" });
    });
});

server.post("/", (req, res) => {
  const { name, barcode, asset_img_id } = req.body;

  if(name && barcode && asset_img_id) {
    assetsModel.postAsset(req.body)
      .then(asset => res.status(201).json(asset))
      .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Could not post asset'});
      });
  } else {
    res.status(400).json({message: 'Must include name, barcode, and asset_img_id'});
  }
});

server.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  assetsModel
    .updateAsset(id, changes)
    .then(assetsModel => {
      res.status(200).json({ message: `asset ${id} updated!` });
    })
    .catch(err => {
      res.status(500).json({ message: "Error Updating asset" });
    });
});

server.delete("/:id", (req, res) => {
  const id = req.params.id;
  assetsModel
    .removeAsset(id)
    .then(assetsModel => {
      res.status(204).json({ message: `asset ${id} Deleted!` });
    })
    .catch(err => {
      res.status(500).json({ message: "Error Deleting asset" });
    });
});

module.exports = server;
