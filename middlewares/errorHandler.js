const errorHandler = (err, req, res, next) => {
  if (err.name === "unauthorized") {
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "notFound") {
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid Token or User" });
  } else if (err.name === "ReferenceError") {
    res.status(403).json({ message: "Forbidden to access the resource" });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    const error = err.errors.map((el) => el.message);
    res.status(400).json({ message: error });
  } else if (err.name === "SequelizeValidationError") {
    const error = err.errors.map((el) => el.message);
    res.status(400).json({ message: error });
  } else if (err.name === "CustomError") {
    res
      .status(400)
      .json({ message: "You have already add this product to your wishlist" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
