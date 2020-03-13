
const jwt = require('jsonwebtoken');
const config = require('../config/tokens');

module.exports.isAuth = function(request, reply) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[2];
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, user) => {
                if (err) {
                    err.status = 500;
                    reject(err)
                }
                if(user) {
                    request.user = user;
                    
                    resolve(reply.continue);
                }
            });
        });
    } else {
       
    }
}


module.exports.isPermission = function(request, reply) {
    return reply.continue
}