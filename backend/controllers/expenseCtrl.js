var expenseModel = require('../models/expense');
var moment = require('moment');

var expenseStatus = {
    lastAction : {
        id: null,
        method : null,
        processed_by : null,
        datetime : null
    }
};

module.exports.getExpenses = function(req, res) {
    return new Promise((resolve, reject) => {
        if (parseInt(req.query.is_access) === 0) {
            req.query.created_by = req.user.id;
        } else {
            delete req.query.is_access;
        }
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
            updateAction('CREATE', req.user.first_name);
            resolve(data);
        });
    });
};

function updateAction (method, processed_by) {
    expenseStatus.lastAction['id'] = new Date().getUTCMilliseconds();
    expenseStatus.lastAction['method'] = method;
    expenseStatus.lastAction['processed_by'] = processed_by;
    expenseStatus.lastAction['datetime'] = moment().format('MMMM Do YYYY, h:mm:ss a'); // March 18th 2020, 2:38:56 pm    
}

module.exports.getExpenseStatus = function(req, res) {
    var tempStatus = [];
    if (expenseStatus.lastAction['method'] && expenseStatus.lastAction['processed_by']) {
        tempStatus.push({
            id : expenseStatus.lastAction['id'],
            method : expenseStatus.lastAction['method'],
            datetime : expenseStatus.lastAction['datetime'], 
            pushMsg : 'New ' + expenseStatus.lastAction['method'] + ' action performed.' + ' processed by ' + expenseStatus.lastAction['processed_by']
        });
    }
    return tempStatus
}

module.exports.removeExpense = function(req, res) {
    var reqObj = {
        id  : req.params.expenseId,
        is_active : 0
    }
    return new Promise((resolve, reject) => {
        expenseModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            updateAction('DELETE', req.user.first_name);
            resolve(data);
        });
    });
};


module.exports.updateExpense = function(req, res) {
    var reqObj = {
        id  : req.params.expenseId,
        category_id : req.payload.category_id,
        dept_id : req.payload.dept_id,
        amount : req.payload.amount,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    return new Promise((resolve, reject) => {
        expenseModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            updateAction('UPDATE', req.user.first_name);
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
            updateAction('UPDATE', req.user.first_name);
            resolve(data);
        });
    });
};


