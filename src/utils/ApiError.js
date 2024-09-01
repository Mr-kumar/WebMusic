class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors; // Fixed typo from `erros` to `errors`

    if (stack) {
      this.stack = stack; // Fixed typo from `statck` to `stack`
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
