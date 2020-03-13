var userRoleCtrl = require('../controllers/userRoleCtrl');
var isAuthenticated = require('../middleware/validateUser')


module.exports = [    
    { method: 'GET', path: '/user-roles', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userRoleCtrl.getUserRoles(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},

    { method: 'GET', path: '/user-roles/me', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userRoleCtrl.getMyRoles(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},

    { method: 'POST', path: '/user-roles/create', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userRoleCtrl.createUserRole(request, h)
            return h.response(data).code(201);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/user-roles/update/{userRoleId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userRoleCtrl.updateUserRole(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/user-roles/delete/{userRoleId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userRoleCtrl.removeUserRole(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }}
];

