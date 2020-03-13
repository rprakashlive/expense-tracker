var departmentModel = require('../models/department');

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
        is_active : req.payload.is_active
    }
    return new Promise((resolve, reject) => {
        departmentModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            setTimeout(function(){ resolve(data); }, 5000);
        });
    });
};


module.exports.updateDepartment = function(req, res) {
    var reqObj = {
        id  : req.params.departmentId,
        name : req.payload.name,
        updated_at : req.payload.updated_at
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