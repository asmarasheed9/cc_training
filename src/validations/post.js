const { object, string, array, date } = require('yup');

const postSchema = object().shape({
    message: string().required().label('Post Body')
});

module.exports = {
    postSchema
};