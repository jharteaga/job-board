class ApiError extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(400, message)
    }

    static notAuthorized(message) {
        return new ApiError(401, message)
    }

    static notFound(message) {
        return new ApiError(404, message)
    }

    static conflict(message) {
        return new ApiError(409, message)
    }

    static unsupportedMediaType(message) {
        return new ApiError(415, message)
    }

    static internalServer(message) {
        return new ApiError(500, message)
    }
}

module.exports = ApiError
