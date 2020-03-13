var userDeptModel = require('../models/user_dept');

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
        is_active : req.payload.is_active
    }
    return new Promise((resolve, reject) => {
        userDeptModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            setTimeout(function(){ resolve(data); }, 5000);
        });
    });
};


module.exports.updateUserDept = function(req, res) {
    var reqObj = {
        id  : req.params.userDeptId,
        dept_id : req.payload.dept_id,
        user_id : req.payload.user_id,
        updated_at : req.payload.updated_at
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