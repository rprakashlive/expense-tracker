var userDeptCtrl = require('../controllers/userDeptCtrl');
var isAuthenticated = require('../middleware/validateUser')


module.exports = [    
    { method: 'GET', path: '/user-departments', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userDeptCtrl.getUserDepts(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'GET', path: '/user-departments/me', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userDeptCtrl.getMyDept(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    
    { method: 'POST', path: '/user-departments/create', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userDeptCtrl.createUserDept(request, h)
            return h.response(data).code(201);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/user-departments/update/{userDeptId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userDeptCtrl.updateUserDept(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/user-departments/delete/{userDeptId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await userDeptCtrl.removeUserDept(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }}
];

