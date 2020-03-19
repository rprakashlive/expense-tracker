const sql = require("../config/db");
const db = require("../config/dbConnect");
const userModel = require("./user").UserModel;

const CategoryModel = db.sequelize.define("category", {
    id: {
      type: db.Sequelize.INTEGER, primaryKey: true
    },
    name: {
      type: db.Sequelize.STRING
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
    tableName: 'category',
    timestamps: false
  });

userModel.hasMany(CategoryModel, {foreignKey: 'created_by'})
CategoryModel.belongsTo(userModel, { foreignKey: 'created_by' });

 
module.exports.get = (param) => {
    return new Promise((resolve, reject) => {
        CategoryModel.findAll({ where: { is_active: param.is_active },
             include: [{ model: userModel,attributes:['first_name'], required:false }]})
        .then(data => {
            return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
}

// module.exports.get = (reqObj, callback) => {
//     sql.query("SELECT category.id, category.name, category.created_at, category.created_by, category.updated_at, category.updated_by, user.first_name FROM category LEFT JOIN user ON user.id = category.created_by WHERE category.is_active IS NULL OR category.is_active = ?",[reqObj.is_active], function (err, result) {
//         if(err) {
//             return callback(err, null);
//         }
//         if (!result) {
//             return callback({}, null);
//         }
//         return callback(null, result);
//     });
// }


module.exports.create = function(param){
    return new Promise((resolve, reject) => {
        CategoryModel.create(param)
        .then(data => {
            return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
}


// module.exports.create = function(reqObj, callback){
//     sql.query('INSERT INTO category SET ?', reqObj, (err, resData) => {
//         if (err) {
//             return callback(err, null);
//             }
//             return callback(null, resData);
//         });
// }

module.exports.put = function(param){
    return new Promise((resolve, reject) => {
        const updatedValues = {
            name : param.name,
            updated_at : param.updated_at
        }
        CategoryModel.update(updatedValues,  { where: { id: param.id }})
        .then(data => {
            return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });  
}



// module.exports.put = function(reqObj, callback){
//     sql.query('UPDATE category SET name = ?, updated_at = ? WHERE id = ?', [reqObj.name, reqObj.updated_at, reqObj.id], (err, resData) => {
//         if (err) {
//             return callback(err, null);
//             }
//             return callback(null, resData);
//         });
// }


module.exports.delete = function(param){
    return new Promise((resolve, reject) => {
        const updatedValues = {
            is_active : param.is_active,
        }
        CategoryModel.update(updatedValues,  { where: { id: param.id }})
        .then(data => {
            return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });  
}

// module.exports.delete = function(reqObj, callback){
//     sql.query('UPDATE category SET is_active = ? WHERE id = ?', [reqObj.is_active, reqObj.id], (err, resData) => {
//         if (err) {
//             return callback(err, null);
//             }
//             return callback(null, resData);
//         });
// }