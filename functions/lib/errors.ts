class CustomError extends Error {
    statusCode: number;

    constructor(message = '', statusCode = 500) {
        super(message);
        this.name = 'CustomError';
        this.statusCode = statusCode;
    }
}

export class AppError extends CustomError {
    constructor(message = '', statusCode = 400) {
        super(message, statusCode);

        this.name = 'AppError';
    }
}

export class InvalidPayloadError extends CustomError {
    constructor(message = '', statusCode = 400) {
        super(message, statusCode);

        this.name = 'InvalidPayloadError';
    }
}

export class NotFoundError extends CustomError {
    constructor(message = '', statusCode = 404) {
        super(message, statusCode);

        this.name = 'NotFoundError';
    }
}

type ErrorList = {
    [key: string]: CustomError;
};

export const ERROR_LIST: ErrorList = {
    AppError: new AppError(),
    NotFoundError: new NotFoundError(),
    InvalidPayloadError: new InvalidPayloadError(),
};
