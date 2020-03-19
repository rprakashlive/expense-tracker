const sql = require("../config/db");
const db = require("../config/dbConnect");
const userModel = require("./user").UserModel;


const ExpenseModel = db.sequelize.define("expense", {
    id: {
      type: db.Sequelize.INTEGER, primaryKey: true
    },
    category_id: {
      type: db.Sequelize.INTEGER
    },
    dept_id: {
        type: db.Sequelize.INTEGER
    },
    amount: {
        type: db.Sequelize.INTEGER
    },
    created_by: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    created_at: {
        type: db.Sequelize.DATE
    },
    updated_at: {
        type: db.Sequelize.DATE
    },
    updated_by: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    is_active: {
        type: db.Sequelize.TINYINT(1)
    },

  },{
    tableName: 'expense',
    timestamps: false
  });

  userModel.hasMany(ExpenseModel, {foreignKey: 'created_by'})
  ExpenseModel.belongsTo(userModel, { foreignKey: 'created_by' });
  
  

module.exports.get = (reqObj, callback) => {
    var query = '';
    var values = [];
    if(reqObj.created_by) {
       query =  "SELECT expense.id, expense.category_id, expense.dept_id, expense.amount, expense.created_at, expense.created_by, expense.updated_at, expense.updated_by, expense.status, expense.approved_by, user.first_name FROM expense LEFT JOIN user ON user.id = expense.created_by WHERE expense.is_active IS NULL OR expense.is_active = ? AND expense.created_at BETWEEN  ? AND ? AND expense.created_by = ?"
       values = [reqObj.is_active, reqObj.start, reqObj.end, reqObj.created_by];
    } else {
       query =  "SELECT expense.id, expense.category_id, expense.dept_id, expense.amount, expense.created_at, expense.created_by, expense.updated_at, expense.updated_by, expense.status, expense.approved_by, user.first_name FROM expense LEFT JOIN user ON user.id = expense.created_by WHERE expense.is_active IS NULL OR expense.is_active = ? AND expense.created_at BETWEEN  ? AND ?" 
       values = [reqObj.is_active, reqObj.start, reqObj.end];
    }
    sql.query(query,values, function (err, result) {
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
    sql.query('INSERT INTO expense SET ?', reqObj, (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.put = function(reqObj, callback){
    sql.query('UPDATE expense SET category_id = ?, dept_id = ?, amount = ?, updated_at = ? WHERE id = ?', [reqObj.category_id, reqObj.dept_id, reqObj.amount, reqObj.updated_at, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}

module.exports.approveExpn = function(reqObj, callback){
    sql.query('UPDATE expense SET amount = ?, status = ?, updated_at = ?, approved_by = ? WHERE id = ?', [reqObj.amount, reqObj.status, reqObj.updated_at, reqObj.approved_by, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}


module.exports.delete = function(reqObj, callback){
    sql.query('UPDATE expense SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
        if (err) {
            return callback(err, null);
            }
            return callback(null, resData);
        });
}