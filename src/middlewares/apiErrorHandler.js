const ApiError = require('../utils/ApiError')
const Response = require('../utils/Response')
const messages = require('../utils/messages')

const apiErrorHanlder = (err, req, res, next) => {
    if (err instanceof ApiError)
        return res.status(err.statusCode).json(new Response({}, {}, [err]))

    res.status(500).json(
        new Response({}, {}, [new ApiError(500, messages.INTERNAL_ERROR)])
    )
}

module.exports = apiErrorHanlder
