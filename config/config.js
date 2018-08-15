module.exports = {

DB: {
    name: 'testShop',
    user: 'postgres',
    password: 'kostyawh',
    host: 'localhost',
    dialect: 'postgres'
},
    port: 3000,

    error404: {
        type: 'invalid_request_error',
        code: '',
        message: 'Unable to resolve the request '
    },

    error400: {
        type: 'invalid_param_error',
        code: 'required',
        message: 'Invalid data parameters'
    }
};