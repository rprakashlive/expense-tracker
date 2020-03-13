const sql = require("../config/db");

module.exports.get = (reqObj, callback) => {
    sql.query("SELECT department.id, department.name, department.created_at, department.created_by, department.updated_at, department.updated_by, user.first_name FROM department LEFT JOIN user ON user.id = department.created_by WHERE department.is_active IS NULL OR department.is_active = ?",[reqObj.is_active], function (err, result) {
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
    sql.query('INSERT INTO department SET ?', reqObj, (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE department SET name = ?, updated_at = ? WHERE id = ?', [reqObj.name, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}

module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE department SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
               callback(err, null);
            }
         callback(null, resData);
        });
}