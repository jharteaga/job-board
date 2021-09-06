const ApiError = require('../utils/ApiError')
const messages = require('../utils/messages')

const contentTypeValidation = (req, res, next) => {
    !req.is('application/json')
        ? next(ApiError.unsupportedMediaType(messages.NOT_MEDIA_TYPE))
        : next()
    return
}

module.exports = contentTypeValidation
