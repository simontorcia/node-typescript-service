import { ApiError } from './ApiError';

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(404, message, 'NOT_FOUND');
    }
}

export class AlreadyExistsError extends ApiError {
    constructor(message: string) {
        super(409, message, 'ALREADY_EXISTS');
    }
}

export class ConflictError extends ApiError {
    constructor(message: string, code = 'CONFLICT') {
        super(409, message, code);
    }
}

export class AlreadyJoinedError extends ConflictError {
    constructor(message: string) {
        super(message, 'ALREADY_JOINED');
    }
}

export class NotJoinedError extends ConflictError {
    constructor(message: string) {
        super(message, 'NOT_JOINED');
    }
}
