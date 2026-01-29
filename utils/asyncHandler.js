const asycHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.reolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asycHandler };
