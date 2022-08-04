import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.status) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: "Internal server error." });
};

class ApplicationError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || "Internal server error.";

    this.status = status;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message || "Not Found.", 404);
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(message || "Conflict.", 409);
  }
}
