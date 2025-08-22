class BadRequest extends Error {
  constructor(message) {
    super(message, 400);
    this.name = "BadRequest";
  }
}

export default BadRequest;
