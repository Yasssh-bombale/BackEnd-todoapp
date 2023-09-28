class errorHandler extends Error {
  constructor(message, statusCode, success) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
  }
}

export const errorMiddleware = (error, req, res, next) => {
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 500;
  return res.status(error.statusCode).json({
    success: error.success,
    msg: error.message,
  });
};
export default errorHandler;
