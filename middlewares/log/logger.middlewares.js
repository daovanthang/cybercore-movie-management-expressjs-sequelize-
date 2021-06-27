const logger = (message) => (req, res, next) => {
  console.log(message);
  next(); // tiep tuc toi middleware
};

module.exports = {
  logger,
};
