const db = require("../../data/dbConfig");
const aws = require("aws-sdk");

// module.exports = {
//   getObject
// };

// const s3 = new aws.S3({
//   accessKeyId: "AKIA4JDPGAQ6CRPLMUY4",
//   secretAccessKey: "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",
//   Bucket: "netgiver"
// });

// GET URL Generator
// async function getObject(bucket, objectKey) {
//   try {
//     const params = {
//       Bucket: bucket,
//       Key: objectKey
//     };

//     const data = await s3.getObject(params).promise();

//     return data.Body.toString("utf-8");
//   } catch (err) {
//     throw new Error(`Could not retrieve file from S3: ${err.message}`);
//   }
// }
