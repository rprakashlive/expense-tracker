const sql = require("../config/db");
const bcrypt = require('bcryptjs');


module.exports.get = (reqObj, callback) => {
    sql.query("SELECT user.id, user.first_name, user.email, user.created_at, user.created_by, user.updated_at, user.updated_by  FROM  user  WHERE user.is_active IS NULL OR user.is_active = ?",[reqObj.is_active], function (err, result) {
        if(err) {
            return callback(err, null);
        }
        if (!result) {
            return callback({}, null);
        }
        return callback(null, result);
    });
}

module.exports.getUserByUsername = (reqObj, callback) => {
    sql.query("SELECT * FROM user WHERE email = ? LIMIT 1",[reqObj.username], function (err, result) {
        if(err) {
            return callback(err, null);
        }
        if (!result) {
            return callback({}, null);
        }
        return callback(null, result[0]);
    });
}


module.exports.create = function(reqObj, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(reqObj.password_hash, salt, (err, hash)=>{
            if(err) {
                return callback(err, null);
            }
            if (hash) {
                reqObj.password_hash = hash;
                sql.query('INSERT INTO user SET ?', reqObj, (err, resData) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, resData);
                 });
            }
        });
    });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE user SET first_name = ?, updated_at = ? WHERE id = ?', [reqObj.first_name, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}


module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE user SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) {
            return callback(err, null);
        }
        return callback(null, isMatch);
    });
}
