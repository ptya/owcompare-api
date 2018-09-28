const createError = require('http-errors');
const { env } = require('../configs');

// Catch 404 and forward to error handler
exports.notFound = (req, res, next) => {
  next(createError(404));
};

// Error handler
exports.handler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  const body = {
    statusCode,
  };

  body.message = err.message || createError(statusCode).message;

  if (env === 'development') {
    body.stack = err.stack;
  }

  res
    .status(statusCode)
    .json(body)
    .end();
};
