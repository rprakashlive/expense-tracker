var authCtrl = require('../controllers/authCtrl');

module.exports = [
    { method: 'POST', path: '/auth/login', config: {},
        handler: async (request, h) => {
        try {
            var data = await authCtrl.login (request, h)
            return h.response(data).code(200);
        } catch (error) {
             console.log('error',error)
             return h.response({message : error.message}).code(error.status);
        } 
    }}
];
