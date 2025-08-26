const errorHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(err.statusCode || 500).send({ message: err.message || "An error occurred on the server" });
};

module.exports = { errorHandler };
