const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const express = require("express");
require("dotenv").config();

//Create a s3Client object
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_KEYID,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

//create function to get public url for AWS S3 Bucket item
async function getObjectUrl(bucketKey) {
  //Create command object
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: bucketKey,
  });

  //Call method to generate AWS presigned url
  const url = await getSignedUrl(s3Client, command);

  if (!url) return new Error("ERROR: Unable to generate presigned URL.");

  return url;
}

async function main() {
  console.log(
    `URL for drit-tech-stack.png: `,
    await getObjectUrl("spx-images/drit-tech-stack.png"),
  );
}

main();
//const app = express.application();
