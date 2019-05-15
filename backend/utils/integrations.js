const AWS = require("aws-sdk");
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
    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}

function getS3Objects() {
    const s3 = new AWS.S3(awsConfigs);
    let params = {Bucket: bucketName};

    return s3.listObjectsV2(params).promise()
        .then(data => {
            const pattern = /(.+)@(.+)@(.+)@(.+).csv/

            return data.Contents.map(x => {
                let fileName = x.Key;

                const match = pattern.exec(fileName);

                let key = fileName.replace(".csv", ""), date = null, time = null;
                if (match && match.length >= 3) {
                    key = match[2];
                    date = match[3];
                    time = match[4];
                }

                return {
                    key: key,
                    date: date,
                    time: time,
                    fileName: fileName
                };
            });
        });
}

function download(fileKey) {
    var s3 = new AWS.S3(awsConfigs);
    var options = {
        Bucket: bucketName,
        Key: fileKey,
    };
    return s3.getObject(options).createReadStream();
}

module.exports = {sendMessageToSQS, getS3Objects, download};