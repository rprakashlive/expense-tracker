var userModel = require('../models/user');


module.exports.getUsers = function(req, res) {
    return new Promise((resolve, reject) => {
        userModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};



module.exports.createUser = function(req, res) {
    console.log("req",req.payload)
    return new Promise((resolve, reject) => {
        userModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};

module.exports.getUser = function(req, res) {
    return new Promise((resolve, reject) => {
        resolve(req.user)
    });
};

