var AWS = require('aws-sdk');
AWS.config.loadFromPath("../backend/sqs.config.json");
const awsConfigs = require("../sqs.config.json");
const config = require("../config.json");
const sqsUrl = config.sqsUrl;
const bucketName = config.s3BucketName;

function sendMessageToSQS(message) {
     
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var params = {
        DelaySeconds: 0,
        MessageBody: JSON.stringify(message),
        QueueUrl: sqsUrl
    };
    sqs.sendMessage(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.MessageId);
    }
    });
}

//TODO: needs to be updated (Promise issue)
function getS3Objects() {
    const s3 = new AWS.S3(awsConfigs);
     let params = { Bucket: bucketName };
     s3.listObjectsV2(params, function(err, data){
         console.log(data);
        return data;
      }).promise();
}

function download(fileKey) {
    var s3 = new AWS.S3(awsConfigs);
    var options = {
        Bucket : bucketName,
        Key : fileKey,
    };
    return s3.getObject(options).createReadStream();
}

module.exports = {sendMessageToSQS, getS3Objects, download};