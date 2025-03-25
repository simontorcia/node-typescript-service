export class NotFoundError extends Error {
    code = 'NOT_FOUND';
    statusCode = 404;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class AlreadyExistsError extends Error {
    code = 'ALREADY_EXISTS';
    statusCode = 409;
    constructor(message: string) {
        super(message);
        this.name = 'AlreadyExistsError';
    }
}

export class ConflictError extends Error {
    code = 'CONFLICT';
    statusCode = 409;
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
    }
}

export class AlreadyJoinedError extends ConflictError {
    constructor(message: string) {
        super(message);
        this.code = 'ALREADY_JOINED';
        this.statusCode = 409;
    }
}

export class NotJoinedError extends ConflictError {
    constructor(message: string) {
        super(message);
        this.code = 'NOT_JOINED';
        this.statusCode = 409;
    }
}
