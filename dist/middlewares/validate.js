"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
exports.validateParams = validateParams;
function validateBody(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: 'Validation error',
                details: error.details.map((d) => d.message)
            });
            return;
        }
        next();
    };
}
function validateQuery(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: 'Query validation error',
                details: error.details.map((d) => d.message)
            });
            return;
        }
        req.query = value;
        next();
    };
}
function validateParams(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: 'Path parameter validation error',
                details: error.details.map((d) => d.message)
            });
            return;
        }
        req.params = value;
        next();
    };
}
