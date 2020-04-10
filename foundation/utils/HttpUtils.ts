/**
 * 404 を表現した Error 拡張
 */
export class NotFoundHttpError extends Error {
  public constructor(...args: any[]) {
    super(...args);
    this.name = 'NotFoundHttpError';
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, NotFoundHttpError);
    }
  }

  public toString(): string {
    return `${this.name}: ${this.message}`;
  }
}

export function forward404(): NotFoundHttpError {
  return new NotFoundHttpError();
}

/**
 * 50x を表現した Error 拡張
 */
export class FatalHttpError extends Error {
  public constructor(...args: any[]) {
    super(...args);
    this.name = 'FatalHttpError';
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, FatalHttpError);
    }
  }

  public toString(): string {
    return `${this.name}: ${this.message}`;
  }
}
