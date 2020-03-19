var categoryModel = require('../models/category');
var moment = require('moment');

var CustomError = function(message, status) {
    this.name = 'CustomError';
    this.message = message;
    this.stack = (new Error()).stack;
    this.status = parseInt(status)
}

module.exports.getCategory = function(req, res) {
    return new Promise((resolve, reject) => {
            categoryModel.get(req.query).then(data => {
                resolve(data);
            }).catch(err => {
                err.status = 500;
                reject(err);
            }); 
        // categoryModel.get(req.query, function (err, data){
        //     if (err) {
        //         err.status = 500;
        //         reject (err);
        //     }
        //     resolve(data);
        // });
    });
};

module.exports.createCategory = function(req, res) {
    return new Promise((resolve, reject) => {
        categoryModel.create(req.payload).then(data => {
            resolve(data);
        }).catch(err => {
            err.status = 500;
            reject(err);
        }); 
        // categoryModel.create(req.payload, function (err, data){
        //     if (err) {
        //         err.status = 500;
        //         reject (err);
        //     }
        //     resolve(data);
        // });
    });
};


module.exports.removeCategory = function(req, res) {
    var param = {
        id  : req.params.categoryId,
        is_active : 0
    }
    return new Promise((resolve, reject) => {
        categoryModel.delete(param).then(data => {
            resolve(data);
        }).catch(err => {
            err.status = 500;
            reject(err);
        }); 

        // categoryModel.delete(reqObj, function (err, data){
        //     if (err) {
        //         err.status = 500;
        //         reject (err);
        //     }
        //     resolve(data);
        // });
    });
};


module.exports.updateCategory = function(req, res) {
    if(!req.params.categoryId || !req.payload.name) {
        var err = new CustomError('Missing Params', 400)  
        throw err;
    }
    var param = {
        id  : req.params.categoryId,
        name : req.payload.name,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    return new Promise((resolve, reject) => {
        categoryModel.put(param).then(data => {
            resolve(data);
        }).catch(err => {
            err.status = 500;
            reject(err);
        }); 
        // categoryModel.put(reqObj, function (err, data){
        //     if (err) {
        //         err.status = 500;
        //         reject (err);
        //     }
        //     resolve(data);
        // });
    });
};