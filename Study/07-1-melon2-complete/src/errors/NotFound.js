class NotFound extends BaseResponseError {
  constructor(message) {
    super(message, 404);
    this.name = "NotFound";
  }
}

export default NotFound;
