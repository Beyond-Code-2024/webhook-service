import { HttpException } from '@nestjs/common';
import { ErrorCode, errorCodeMap } from './app.constants';

export class ApplicationError extends HttpException {
  public code: ErrorCode;
  public details: string;

  constructor(message: string, code: ErrorCode, details?: string) {
    super(message, errorCodeMap[code].httpStatusCode);
    this.code = code;
    if (details) {
      this.details = details;
    } else {
      this.details = errorCodeMap[this.code].details;
    }

    this.name = `ApplicationError ${this.code}`;
  }
}

export default ApplicationError;
