var usersRoute = require('./user');
var authRoute = require('./auth');
var roleRoute = require('./role');
var departmentRoute = require('./department');
var categoryRoute = require('./category');
var expenseRoute = require('./expense');
var userDeptRoute = require('./user_dept');
var userRoleRoute = require('./user_role');

module.exports = [].concat(usersRoute, authRoute, roleRoute, departmentRoute, categoryRoute, expenseRoute, userDeptRoute, userRoleRoute);
