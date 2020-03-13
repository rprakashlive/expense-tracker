const sql = require("../config/db");

module.exports.get = (reqObj, callback) => {
    sql.query("SELECT role.id, role.name, role.created_at, role.created_by, role.updated_at, role.updated_by, user.first_name FROM role LEFT JOIN user ON user.id = role.created_by WHERE role.is_active IS NULL OR role.is_active = ?",[reqObj.is_active], function (err, result) {
        if(err) {
            return callback(err, null);
        }
        if (!result) {
            return callback({}, null);
        }
        return callback(null, result);
    });
}

module.exports.create = function(reqObj, callback){
    sql.query('INSERT INTO role SET ?', reqObj, (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE role SET name = ?, updated_at = ? WHERE id = ?', [reqObj.name, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE role SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}