let express = require("express");
let router = express.Router();

const awsWorker = require("./s3Model");

router.get("/api/files/:filename", awsWorker.doDownload);

module.exports = router;
