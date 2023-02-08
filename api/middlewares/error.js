const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack);

  const statusCode = err.statusCode || 500;

  return res.statusCode(statusCode).json({ message: err.message });
};

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => next(error));
  };
};

module.exports = {
  globalErrorHandler,
  catchAsync,
};
