export class APIError extends Error {
  readonly statusCode: number
  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}
