exports.NotFoundRoutes = (req, res, next) => {
  return res.status(404).json({ status: "failed", Message: "Route Not Found" });
};
xports.GlobalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "Error",
    Message: err.message,
    code: err.statusCode || 500,
    data: null,
  });
};
