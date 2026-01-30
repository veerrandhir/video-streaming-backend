const asycHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.reolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asycHandler };
