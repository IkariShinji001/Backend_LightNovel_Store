const authentication = require('./authentication');
const authorization = require('./authorization');

const auth = {
    adminOnly: [authentication, authorization.admin],
    employeeOnly: [authentication, authorization.employee],
    loginRequired: [authentication]
}

module.exports = auth;