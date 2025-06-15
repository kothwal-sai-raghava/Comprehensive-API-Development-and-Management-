const errHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = res.statusCode === 200 ? res.statusCode : 500; // Default to 500 if status code is not set
    res.status(statusCode);
    res.json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
};

module.exports = errHandler;
// This middleware handles errors in the Express application.