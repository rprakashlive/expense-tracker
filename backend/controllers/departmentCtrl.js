var departmentModel = require('../models/department');
var moment = require('moment');

module.exports.getDepartment = function(req, res) {
    return new Promise((resolve, reject) => {
        departmentModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};

module.exports.createDepartment = function(req, res) {
    return new Promise((resolve, reject) => {
        departmentModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeDepartment = function(req, res) {
    var reqObj = {
        id  : req.params.departmentId,
        is_active : 0
    }
    return new Promise((resolve, reject) => {
        departmentModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.updateDepartment = function(req, res) {
    var reqObj = {
        id  : req.params.departmentId,
        name : req.payload.name,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    return new Promise((resolve, reject) => {
        departmentModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};