var userRoleModel = require('../models/user_role');

module.exports.getUserRoles = function(req, res) {
    return new Promise((resolve, reject) => {
        userRoleModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.getMyRoles = function(req, res) {
    req.query.user_id = req.user.id;
    return new Promise((resolve, reject) => {
        userRoleModel.getUserRoles(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.createUserRole = function(req, res) {
    return new Promise((resolve, reject) => {
        userRoleModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeUserRole = function(req, res) {
    var reqObj = {
        id  : req.params.userRoleId,
        is_active : req.payload.is_active
    }
    return new Promise((resolve, reject) => {
        userRoleModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            setTimeout(function(){ resolve(data); }, 5000);
        });
    });
};


module.exports.updateUserRole = function(req, res) {
    var reqObj = {
        id  : req.params.userRoleId,
        role_id : req.payload.role_id,
        user_id : req.payload.user_id,
        updated_at : req.payload.updated_at
    }
    return new Promise((resolve, reject) => {
        userRoleModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};