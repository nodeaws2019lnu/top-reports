const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const scheduler = require('node-schedule');
const reportservice = require('./services/reportsservice');

const reportsRouter = require('./routes/reports');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.type('json');
    next();
});

app.use('/reports', reportsRouter);

app.listen(3000);


//For testing purposes uncomment code to send messages to sqs on startup
/* reportservice.requestReports(); */

//Schedules job once a minute. Job generates all matching reports
scheduler.scheduleJob("* * * * *", function (fireDate) {
    reportservice.requestReports();
    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});

module.exports = app;
