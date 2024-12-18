class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
  static create(message, statusCode) {
    return new ApiError(message, statusCode);
  }
}
module.exports = ApiError;
