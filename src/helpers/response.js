const sendResponse = {
    withData(req, res, responseData, code) {
        const response = {
            status: {
                code: code,
                message: 'Success'
            },
            data: responseData
        };

        return res.status(code).json(response);
    },

    withoutData(req, res, message, code) {
        const response = {
            status: {
                code: code,
                message: message || 'Success'
            },
        };

        return res.status(code).json(response);
    },

    onErrorResp(req, res, message, code = 404) {
        const error = {
            status: {
                code: code,
                message: message
            }
        }
        error.status.code = code; // 400 means client input a field that fails validation
        return res.status(400).json(error);
    }
};

module.exports = { sendResponse };