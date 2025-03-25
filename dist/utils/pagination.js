"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationMetadata = exports.calculatePagination = void 0;
const calculatePagination = (page, pageSize) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    return { offset, limit };
};
exports.calculatePagination = calculatePagination;
const createPaginationMetadata = (currentPage, totalItems, pageSize) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { currentPage, totalPages };
};
exports.createPaginationMetadata = createPaginationMetadata;
