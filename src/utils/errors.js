const ApiError = require("./ApiError");

class NotFoundError extends ApiError {
  constructor(resource = "Recurso") {
    super(404, `${resource} no encontrado`);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Solicitud incorrecta", details) {
    super(400, message, details);
  }
}

module.exports = {
  NotFoundError,
  BadRequestError
};
