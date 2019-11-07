const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");
// const Helper = require("./GetHelper");

const router = express.Router();

aws.config.update({
  accessKeyId: "AKIA4JDPGAQ6NBVLTSWV",
  secretAccessKey: "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",
  region: 'us-east-2'
});

const s3 = new aws.S3();

/**
 * Single Upload
 */
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'netgiver',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const singleUpload = upload.single('image');

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// router.post("/profile-img-upload", (req, res) => {
//   profileImgUpload(req, res, error => {
//     // console.log( 'request', req.file );
//     // console.log( 'error', error );
//     if (error) {
//       console.log("errors", error);
//       res.json({ error: error });
//     } else {
//       // If File not found
//       if (req.file === undefined) {
//         console.log("Error: No File Selected!");
//         res.json("Error: No File Selected");
//       } else {
//         // If Success
//         const imageName = req.file.key;
//         const imageLocation = req.file.location;
//         // Save the file name into database into profile model
//         res.json({
//           image: imageName,
//           location: imageLocation
//         });
//       }
//     }
//   });
// });

router.post('/upload', (req, res) => {
  singleUpload(req, res, err => {
    if(err) {
      return res.status(422).json({error: err});
    }
    return res.status(200).json({imageUrl: req.file.location});
  });
});

router.get('/signed', (req, res) => {
  const params = {Bucket: 'netgiver', Key: 'greynato-1572279805779.jpg'};
  const url = s3.getSignedUrl('getObject', params);
  res.status(200).json(url).type(jpg);
});

router.get('/object', (req, res) => {
  const params = {Bucket: 'netgiver', Key: 'greynato-1572279805779.jpg'};

  s3.getObject(params, (err, data) => {
    if (err) {
        return res.send({ "error": err });
    }
    res.send({ data });
});
})

// GET URL Generator
// const profileDownload = {
//   Bucket: "netgiver",
//   Key: ""
// };

// router.get(".profile-img-upload", (req, res) => {
// Both Key and ContentType are defined in the client side.
// Key refers to the remote name of the file.
//   const { Key } = req.query;
//   profileDownload(Key)
//     .then(geturl => {
//       res.send(geturl);
//     })
//     .catch(err => {
//       res.send(err);
//     });
// });

// router.get('/profile-img-upload', (req, res) => {
//   try {
//       await Helper.getObject('netgiver', 'https://netgiver.s3.us-east-2.amazonaws.com/greynato-1572280483541.jpg')
//       res.status(201).json({ message: 'you did it john nice work'})
//   } catch (err) {
//       res.status(500).json({ message: err })
//   }

// })

module.exports = router;
