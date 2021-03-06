var userDeptModel = require('../models/user_dept');
var moment = require('moment');

module.exports.getUserDepts = function(req, res) {
    return new Promise((resolve, reject) => {
        userDeptModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.getMyDept = function(req, res) {
    console.log('req.user',req.user);
    // return new Promise((resolve, reject) => {
    //     userDeptModel.getUserDept(req.query, function (err, data){
    //         if (err) {
    //             err.status = 500;
    //             reject (err);
    //         }
    //         resolve(data);
    //     });
    // });
};




module.exports.createUserDept = function(req, res) {
    return new Promise((resolve, reject) => {
        userDeptModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeUserDept = function(req, res) {
    var reqObj = {
        id  : req.params.userDeptId,
        is_active : 0
    }
    return new Promise((resolve, reject) => {
        userDeptModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.updateUserDept = function(req, res) {
    var reqObj = {
        id  : req.params.userDeptId,
        dept_id : req.payload.dept_id,
        user_id : req.payload.user_id,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    return new Promise((resolve, reject) => {
        userDeptModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};