const asyncErrorHandler = (func) => {
  return async (req, res, next) => {
    await func(req, res).catch((error) => next(error));
  };
};
