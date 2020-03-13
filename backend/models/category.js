const sql = require("../config/db");

module.exports.get = (reqObj, callback) => {
    sql.query("SELECT category.id, category.name, category.created_at, category.created_by, category.updated_at, category.updated_by, user.first_name FROM category LEFT JOIN user ON user.id = category.created_by WHERE category.is_active IS NULL OR category.is_active = ?",[reqObj.is_active], function (err, result) {
        if(err) {
            callback(err, null);
        }
        if (!result) {
            callback({}, null);
        }
        callback(null, result);
    });
}

module.exports.create = function(reqObj, callback){
    sql.query('INSERT INTO category SET ?', reqObj, (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE category SET name = ?, updated_at = ? WHERE id = ?', [reqObj.name, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}

module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE category SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}