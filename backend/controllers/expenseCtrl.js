var expenseModel = require('../models/expense');

module.exports.getExpenses = function(req, res) {
    return new Promise((resolve, reject) => {
        expenseModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};

module.exports.createExpense = function(req, res) {
    return new Promise((resolve, reject) => {
        expenseModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeExpense = function(req, res) {
    var reqObj = {
        id  : req.params.expenseId,
        is_active : req.payload.is_active
    }
    return new Promise((resolve, reject) => {
        expenseModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            setTimeout(function(){ resolve(data); }, 5000);
        });
    });
};


module.exports.updateExpense = function(req, res) {
    var reqObj = {
        id  : req.params.expenseId,
        category_id : req.payload.category_id,
        dept_id : req.payload.dept_id,
        amount : req.payload.amount,
        updated_at : req.payload.updated_at
    }
    return new Promise((resolve, reject) => {
        expenseModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.approveExpense = function(req, res) {
    var reqObj = {
        id  : req.params.expenseId,
        status : req.payload.status,
        amount : req.payload.amount,
        updated_at : req.payload.updated_at,
        approved_by : req.user.id
    }
    return new Promise((resolve, reject) => {
        expenseModel.approveExpn(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


