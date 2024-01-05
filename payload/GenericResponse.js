class GenericResponse {
  constructor(statusCode, success, message, data, error) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

module.exports = GenericResponse;
