const sql = require("mssql");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const csvjson = require('csvjson');


exports.handler = (event, context, callback) => {
    const config = {
        user: process.env.db_user,
        password: process.env.db_password,
        server: process.env.db_server,
        database: process.env.db_name
    };
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        var request = new sql.Request();

        const message = JSON.parse(event.Records[0].body);
        console.log(message);
        request.query(message.query, function (err, recordset) {

            //if (err) console.log(err);

            // send records as a response
            console.log(recordset);
            const csvData = csvjson.toCSV(recordset.recordset, {
                headers: 'key'
            });

            var bucketName = process.env.s3_bucket_name;
            var fileExt = '.csv';
            var fileName = `${message.name}_${message.date}_${message.time}${fileExt}`;

            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: csvData
            };

            s3.putObject(params, function (err, data) {
                if (err)
                    console.log(err);
                else {
                    console.log(`Successfully saved object to ${bucketName}/${fileName}`);
                    callback(null, "success");
                }
            });
        });
    });
};