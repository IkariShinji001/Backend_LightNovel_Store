const authentication = require('./authentication');
const authorization = require('./authorization');

const authMiddleware = {
    adminOnly: [authentication, authorization.admin],
    employeeOnly: [authentication, authorization.employee],
    loginRequired: [authentication]
}

module.exports = authMiddleware;