var deptCtrl = require('../controllers/departmentCtrl');
var isAuthenticated = require('../middleware/validateUser')


module.exports = [    
    { method: 'GET', path: '/departments', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await deptCtrl.getDepartment(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'POST', path: '/departments/create', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await deptCtrl.createDepartment(request, h)
            return h.response(data).code(201);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/departments/update/{departmentId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await deptCtrl.updateDepartment(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/departments/delete/{departmentId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await deptCtrl.removeDepartment(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }}
];

