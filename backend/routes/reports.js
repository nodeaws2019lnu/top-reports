const express = require('express');
const reportservice = require('../services/reportsservice');
const defaultErrorHandling = require('../utils/errorutils').defaultErrorHandling;

const router = express.Router();

router.get('/:id/execs', defaultErrorHandling(function (req, res) {
    return reportservice.getReportExecutions(req.params.id)
        .then(execs => {
            res.json(execs);
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
        res.json({data: reports});
    });
}));

module.exports = router;
