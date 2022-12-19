export class InvalidInputError extends Error {
  name = 'Error';
  constructor(msg = 'Invalid input') {
    super(msg)
  }
}

export class OperationError extends Error {
  name = 'Error';
  constructor(msg = 'Operation failed') {
    super(msg);
  }
}
