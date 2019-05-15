const express = require('express');
const reportservice = require('../services/reportsservice');
const defaultErrorHandling = require('../utils/errorutils').defaultErrorHandling;
const integrations = require('../utils/integrations');

const router = express.Router();

router.get('/:id/execs', defaultErrorHandling(function (req, res) {
    return reportservice.getReportExecutions(req.params.id)
        .then(execs => {
            res.json(execs);
        })
}));

router.put('/', defaultErrorHandling(function (req, res) {
    return reportservice.updateReport(req.body)
        .then(rep => {
            res.json(rep);
        })
}));

router.delete('/:id', defaultErrorHandling(function (req, res) {
    return reportservice.deleteReport(req.params.id)
        .then(() => {
            res.json({status: "Ok"});
        })
}));

router.post('/', defaultErrorHandling(function (req, res) {
    const reportData = req.body;

    return reportservice.createReport(reportData).then(rep => {
        res.status(201);
        res.json(rep);
    });
}));

router.get('/', defaultErrorHandling(function (req, res) {
    return reportservice.getReports().then(reports => {
        res.json(reports);
    });
}));

router.get('/getList', defaultErrorHandling(function (req, res) {
    return reportservice.getS3Objects()
        .then(files => {
            res.json({files});
        })
}));

router.get('/download/:name', function(req, res, next){
    var fileKey = req.params.name;
    console.log('Trying to download file', fileKey);

    res.attachment(fileKey);
    var fileStream = integrations.download(fileKey);
    fileStream.pipe(res);
});

module.exports = router;
