const CONFIG = require('../../config/config');

module.exports = (paramName) => {

    let err = new Error(CONFIG.error400.message);
    err.status = 400;
    err.type = CONFIG.error400.type;
    err.params = [{
        code: CONFIG.error400.code,
        message: `${paramName} cannot be blank.`,
        name: paramName
        }];
    return err;
};