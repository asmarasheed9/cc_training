const { object, string} = require('yup');

const registerUserSchema = object().shape({
    email: string().required().label('Email'),
    password: string().required().label('Password'),
    role: string().oneOf([
        'Admin',
        'Non-Admin',
        'helper'
    ]).required().label('Role')
});

const loginSchema = object().shape({
    email: string().required().label('Email'),
    password: string().required().label('Password')
});

module.exports = {
    registerUserSchema,
    loginSchema
}
