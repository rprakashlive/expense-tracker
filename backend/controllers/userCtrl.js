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

module.exports.updateUser = function(req, res) {
    var reqObj = {
        id  : req.params.userId,
        first_name : req.payload.first_name,
        updated_at : req.payload.updated_at
    }
    return new Promise((resolve, reject) => {
        userModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeUser = function(req, res) {
    var reqObj = {
        id  : req.params.userId,
        is_active : 0
    }
    return new Promise((resolve, reject) => {
        userModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};




