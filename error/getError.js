const STATIC = require('../static');

module.exports = (paramName) => {

    let err = new Error(STATIC.error400.message);
    err.status = 400;
    err.type = STATIC.error400.type;
    err.params = [{
        code: STATIC.error400.code,
        message: `${paramName} cannot be blank.`,
        name: paramName
        }];
    return err;
};