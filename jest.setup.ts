// Mock logger
jest.mock('./src/utils/logger', () => ({
    __esModule: true,
    default: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

// Mock DB
jest.mock('./src/database/config/db', () => ({
    __esModule: true,
    default: {
        getConnection: jest.fn(),
        query: jest.fn(),
        execute: jest.fn(),
        end: jest.fn(),
    },
}));
