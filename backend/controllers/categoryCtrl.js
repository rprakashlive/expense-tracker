var categoryModel = require('../models/category');

module.exports.getCategory = function(req, res) {
    return new Promise((resolve, reject) => {
        categoryModel.get(req.query, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};

module.exports.createCategory = function(req, res) {
    return new Promise((resolve, reject) => {
        categoryModel.create(req.payload, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};


module.exports.removeCategory = function(req, res) {
    var reqObj = {
        id  : req.params.categoryId,
        is_active : req.payload.is_active
    }
    return new Promise((resolve, reject) => {
        categoryModel.delete(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            setTimeout(function(){ resolve(data); }, 5000);
        });
    });
};


module.exports.updateCategory = function(req, res) {
    var reqObj = {
        id  : req.params.categoryId,
        name : req.payload.name,
        updated_at : req.payload.updated_at
    }
    return new Promise((resolve, reject) => {
        categoryModel.put(reqObj, function (err, data){
            if (err) {
                err.status = 500;
                reject (err);
            }
            resolve(data);
        });
    });
};