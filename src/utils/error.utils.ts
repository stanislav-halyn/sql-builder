/**
 * Error class for throwing errors related
 * to `non-exist` functionality
 */
export class NonExistError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'NonExistError';
  }
}
