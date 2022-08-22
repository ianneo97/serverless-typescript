class CustomError extends Error {
    statusCode: number;
    constructor(message = '') {
        super(message);
        this.name = 'CustomError';
        this.statusCode = 500;
    }
}

export class AppError extends CustomError {
    statusCode: number;

    constructor(message = '', statusCode = 400) {
        super(message);

        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}

export class NotFoundError extends CustomError {
    statusCode: number;

    constructor(message = '', statusCode = 404) {
        super(message);

        this.statusCode = statusCode;
        this.name = 'NotFoundError';
    }
}

type ErrorList = {
    [key: string]: CustomError;
};

export const ERROR_LIST: ErrorList = {
    AppError: new AppError(),
    NotFoundError: new NotFoundError(),
};
