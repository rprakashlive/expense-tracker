var userCtrl = require('../controllers/userCtrl');
var isAuthenticated = require('../middleware/validateUser')


module.exports = [
    { method: 'GET', path: '/users', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userCtrl.getUsers(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'GET', path: '/users/me', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userCtrl.getUser(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},

    { method: 'POST', path: '/users', config: {        
        ext: {
             onPreAuth: { method: isAuthenticated.isAuth }
        }
    },handler: async (request, h) => {
        try {
            var data = await userCtrl.createUser(request, h)
            return h.response(data).code(201);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }}
];
