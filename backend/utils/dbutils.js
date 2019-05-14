const {Pool} = require('pg');
const crypto = require('crypto');

const connectionString = process.env.DATABASE_URL ||
    'postgres://report-svc-user:password@report-svc.cesdohjzgtpg.eu-west-2.rds.amazonaws.com:5432/report-svc?username=report-svc-user&password=password';

const pool = new Pool({
    connectionString: connectionString
});

String.prototype.replaceAll = function(patten, replacement) {
    let target = String(this);
    while (target.match(patten)) {
        target = target.replace(patten, replacement);
    }

    return target;
};

function processQuery(query, values) {
    const pattern = /(\s+|\(|,)\?(\s+|$|\)|,)/;

    if (query) {
        let i = 0;
        let count = 1;
        return query.replaceAll(pattern, x => {
            if (i > values.length) {
                return x;
            }
            i++;

            return x.replace(/\?/, x => {
                return ` ${values[i - 1] ? '$' + count++ : "null"} `;
            });
        });
    }

    return query;
}

module.exports = {
    query: function (text, params=[]) {
        return new Promise((resolve, reject) => {
            pool.query(processQuery(text, params), params.filter(x => x))
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    hash: function (str) {
        return crypto.createHash('sha256')
            .update(str)
            .digest('hex');
    }
};