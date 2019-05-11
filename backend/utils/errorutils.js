const errors = require('../errors/errors');

function respondWithError(res, msg, status = 400) {
    res.status(status);
    res.json({error: msg});
}

function defaultErrorHandling(router) {
    return (req, res) => {
        return router(req, res)
            .then(x => x, err => {
                console.error(err.stack);

                let statusCode = 500;
                if (err instanceof errors.AppError) {
                    statusCode = err.getStatusCode();
                }

                respondWithError(res, err, statusCode);
            })
    }
}

module.exports = {respondWithError, defaultErrorHandling};