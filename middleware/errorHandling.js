const errorHandling = (err, req, res, next) => {
  if (err.name === "UnauthorizedError")
    res.status(401).json({ message: "The user is unauthorized" });
  return res.status(500).json({ err: err.message });
};

module.exports = errorHandling;
