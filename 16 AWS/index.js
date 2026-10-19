const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
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

//function to list all objects in the bucket
async function listFiles() {
  //create command
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: "/",
  });

  const files = await s3Client.send(command);
  console.log(files);
}

//create function to get public url for AWS S3 Bucket item
async function downloadUrl(bucketKey) {
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

//function to upload content to S3 Bucket using pre-signed url
async function uploadFile(fileName, contentType) {
  //create command oject
  //Create command object
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `spx-uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });

  //generate a preSigned Url that expries in 2 minutes
  const url = await getSignedUrl(s3Client, command, { expiresIn: 180 });

  return url;
}

async function deleteFile(fileKey) {
  //prepare the delete command
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileKey,
  });

  const deletedFile = await s3Client.send(command);
}

async function main() {
  /*   console.log(
    `URL for drit-tech-stack.png: `,
    await downloadUrl("spx-images/drit-tech-stack.png"),
  ); */

  //Upload url
  console.log(
    "Uplopad Link:",
    await uploadFile(`Calendar-${Date.now()}.pdf`, "application/pdf"),
  );

  //Call function to list all files from S3 Bucket
  await listFiles();

  //call function to delete file
  await deleteFile("spx-uploads/user-uploads/Calendar-1787738557126.pdf");
}

main();
//const app = express.application();
