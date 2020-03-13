var userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/tokens');


var CustomError = function(message, status) {
    this.name = 'CustomError';
    this.message = message;
    this.stack = (new Error()).stack;
    this.status = parseInt(status)
}


module.exports.login = function(req, res) {
    return new Promise((resolve, reject) => {
        var reqObj = {
            username : req.payload.username,
            password : req.payload.password
        }
        userModel.getUserByUsername(reqObj, (err, user) => {
            if (err) {
                err.status = 500
                reject(err);
            };
            if (!user) {
                var err = new CustomError('Invalid username', 500)  
                reject(err);
            } else {
                var parsedUser = JSON.parse(JSON.stringify(user));
                userModel.comparePassword(reqObj.password, parsedUser.password_hash, (err, isMatch) => {
                    if (err) {
                        err.status = 500
                        reject(err);
                    } 
                    if (isMatch) {
                        const token = jwt.sign(user, config.secret, {
                            expiresIn: 604800 // 1 week
                        });
                        var dataObj = {
                            success: true, token: 'JWT ' + token, user: {
                                id: user.id,
                                first_name: user.first_name,
                                email: user.email
                            }
                        }
                        resolve(dataObj);
                    } else {
                        var err = new CustomError('Invalid Password', 500)
                        reject(err);
                    }
                })
            }
        });
    });
};
