var expenseCtrl = require('../controllers/expenseCtrl');
var isAuthenticated = require('../middleware/validateUser')


module.exports = [    
    { method: 'GET', path: '/expenses', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await expenseCtrl.getExpenses(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'POST', path: '/expenses/create', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await expenseCtrl.createExpense(request, h)
            return h.response(data).code(201);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/expenses/update/{expenseId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await expenseCtrl.updateExpense(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/expenses/approval/{expenseId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await expenseCtrl.approveExpense(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }},
    { method: 'PUT', path: '/expenses/delete/{expenseId}', config: {        
        ext: {
            onPreAuth: { method: [isAuthenticated.isAuth, isAuthenticated.isPermission]}
        }
    },handler: async (request, h) => {
        try {
            var data = await expenseCtrl.removeExpense(request, h)
            return h.response(data).code(200);
        } catch (error) {
            return h.response({message : error.message}).code(error.status);
        } 
    }}
];

