const db = require("../utils/dbutils");
const NotFoundError = require("../errors/errors").NotFoundError;
const ValidationError = require("../errors/errors").ValidationError;
const integrations = require("../utils/integrations");

function mapDatePart(datePart, len) {
    datePart = String(datePart);

    return '0'.repeat(Math.max(datePart.length - len, 0)) + datePart;
}

function formatDate(date) {
    return `${date.getUTCFullYear()}-${mapDatePart(date.getUTCMonth() + 1, 2)}-${mapDatePart(date.getUTCDate(), 2)}`;
}

function formatTime(date) {
    return `${mapDatePart(date.getUTCHours(), 2)}-${mapDatePart(date.getUTCMinutes(), 2)}-${mapDatePart(date.getUTCSeconds(), 2)}`;
}

function isDate(str) {
    return str.match(/(\d{4})-(\d{2})-(\d{2})/);
}

function isTime(str) {
    return str.match(/(\d{2})-(\d{2})-(\d{2})/);
}

function validatePeriodMode(periodMode) {
    return periodMode &&
        (periodMode === 'o' || periodMode === 'd' || periodMode === 'w' || periodMode === 'm');
}

function validateReport(reportData) {
    return reportData.name &&
        reportData.query &&
        reportData.startDate && isDate(reportData.startDate) &&
        (!reportData.endDate || isDate(reportData.endDate)) &&
        reportData.execTime && isTime(reportData.execTime) &&
        validatePeriodMode(reportData.periodMode);
}

function mapDbReport(dbReport) {
    return {
        "id": dbReport.id,
        "name": dbReport.report_name,
        "query": dbReport.report_data,
        "startDate": dbReport.start_date,
        "endDate": dbReport.end_date,
        "execTime": dbReport.exec_time,
        "periodMode": dbReport.period_mode
    };
}

function getReportsToExecute() {
    return db.query(`SELECT * 
                     FROM REPORT r
                     WHERE (
                       CASE
                         WHEN r.PERIOD_MODE = 'o'
                           THEN (current_date = r.start_date
                           AND current_time >= r.EXEC_TIME
                           )
                         WHEN r.PERIOD_MODE = 'd'
                           THEN (current_date >= r.start_date
                           AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
                           AND current_time >= r.EXEC_TIME
                           )
                         WHEN r.PERIOD_MODE = 'w'
                           THEN (current_date >= r.start_date
                           AND extract(dow from r.start_date) = extract(dow from current_date)
                           AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
                           AND current_time >= r.EXEC_TIME
                           )
                         WHEN r.PERIOD_MODE = 'm'
                           THEN (current_date >= r.start_date
                           AND extract(day from r.start_date) = extract(day from current_date)
                           AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
                           AND current_time >= r.EXEC_TIME
                           )
                         WHEN r.PERIOD_MODE = 'y'
                           THEN (current_date >= r.start_date
                           AND extract(doy from r.start_date) = extract(doy from current_date)
                           AND (r.END_DATE IS NULL OR current_date <= r.END_DATE)
                           AND current_time >= r.EXEC_TIME
                           )
                         ELSE FALSE END
                       )
                       AND (
                         0 = (SELECT COUNT(1)
                              FROM REPORT_EXEC_DATA red
                              WHERE red.REPORT_ID = r.id
                                and red.EXEC_TIME::time(0) = r.EXEC_TIME::time(0)
                                and red.EXEC_TIME::date = current_date)
                       )`)
        .then(({rows}) => {
            return rows.map(mapDbReport);
        })
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

module.exports = {
    getReportExecutions: function (id) {
        return integrations.getS3Objects()
            .then(s3Data => {
                s3Data = groupBy(s3Data, x => x.key);

                return db.query('SELECT * FROM report WHERE id = ?', [id])
                    .then(({rows}) => {
                        if (rows.length === 0) {
                            return Promise.reject(new NotFoundError('Report not found'));
                        }

                        return rows.map(mapDbReport)[0];
                    })
                    .then(report => {
                        const reportExecs = s3Data.get(report.id.toString());
                        return {reportExecs};
                    })
            });
    },
    requestReports: function () {
        const currentDateTime = new Date();
        const dateStr = formatDate(currentDateTime);
        const timeStr = formatTime(currentDateTime);
        getReportsToExecute()
            .then(reports => {
                const messageExecs = [];
                reports.forEach(report => {
                    const message = {
                        reportId: report.id,
                        query: report.query,
                        date: dateStr,
                        time: timeStr,
                        name: report.name
                    };
                    integrations.sendMessageToSQS(message);
                });

                return Promise.all(messageExecs)
                    .then(() => {
                        return reports;
                    });
            })
            .then(reports => {
                const insertExecs = [];
                reports.forEach(report => {
                    insertExecs.push(db.query(`INSERT INTO report_exec_data (exec_time, report_id)
                                               VALUES (to_timestamp(?, 'YYYY-MM-DD HH24-MI-SS'), ?)`,
                        [dateStr + ' ' + report.execTime, report.id]));
                });

                return Promise.all(insertExecs);
            }, err => {
                if (err) {
                    console.error(err);
                }
            })
    },
    getReports: function () {
        return db.query("SELECT * FROM report")
            .then(({rows}) => {
                return rows.map(mapDbReport);
            });
    },
    getS3Objects: function () {
        return integrations.getS3Objects();
    },
    updateReport: function (reportData) {
        if (!validateReport(reportData)) {
            return Promise.reject(new ValidationError("Invalid parameters"));
        }

        return db.query(`UPDATE report
                         SET report_name = ?,
                             end_date    = to_date(?, 'YYYY-MM-DD'),
                             exec_time   = to_timestamp(?, 'HH24-MI-SS')::time
                         WHERE id = ? RETURNING *`,
            [reportData.name, reportData.endDate, reportData.execTime, reportData.id])
            .then(({rows}) => {
                if (rows.length === 0) {
                    return Promise.reject("No report found")
                }

                return mapDbReport(rows[0]);
            });
    },
    deleteReport: function (id) {
        return db.query(`DELETE
                         FROM report
                         where id = ?`, [id]);
    },
    createReport: function (reportData) {
        if (!validateReport(reportData)) {
            return Promise.reject(new ValidationError("Invalid parameters"));
        }

        return db.query('SELECT * FROM report where report_name = ?', [reportData.name])
            .then(({rows}) => {
                if (rows.length > 0) {
                    return Promise.reject(new ValidationError("Report with this name already exists"));
                }

                return db.query(`INSERT INTO report (report_name, report_data, start_date, end_date, exec_time,
                                                     period_mode)
                                 VALUES (?, ?, to_date(?, 'YYYY-MM-DD'), to_date(?, 'YYYY-MM-DD'),
                                         to_timestamp(?, 'HH24-MI-SS')::time, ?) RETURNING id`,
                    [reportData.name, reportData.query, reportData.startDate, reportData.endDate, reportData.execTime, reportData.periodMode])
                    .then(({rows}) => {
                        reportData.id = rows[0].id;
                        return reportData;
                    });
            });
    }
};