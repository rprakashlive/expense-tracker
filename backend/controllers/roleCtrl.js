var roleModel = require('../models/role');
var moment = require('moment');

module.exports.getRoles = function(req, res) {
    return new Promise((resolve, reject) => {
        roleModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};

module.exports.createRole = function(req, res) {
    return new Promise((resolve, reject) => {
        roleModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeRole = function(req, res) {
    var reqObj = {
        id  : req.params.roleId,
        is_active : 0
    }
    return new Promise((resolve, reject) => {
        roleModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.updateRole = function(req, res) {
    var reqObj = {
        id  : req.params.roleId,
        name : req.payload.name,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    return new Promise((resolve, reject) => {
        roleModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};