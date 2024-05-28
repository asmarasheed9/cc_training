const Sequelize = require('sequelize');
const { DB_CREDENTIALS } = require('../util/constant')

const db = {};

const sequelize = new Sequelize(DB_CREDENTIALS.DB_NAME, DB_CREDENTIALS.DB_USER, DB_CREDENTIALS.DB_PASSWORD, {
    port: DB_CREDENTIALS.DB_PORT,
    host: DB_CREDENTIALS.DB_HOST,
    dialect: DB_CREDENTIALS.DB_DIALECT,
    define: {
        freezeTableName: true,
        paranoid: true,
    }
});
// creation of all four tables
db['User'] = require('./user')(sequelize, Sequelize.DataTypes);
db['Role'] = require('./role')(sequelize, Sequelize.DataTypes);
db['Post'] = require('./post')(sequelize, Sequelize.DataTypes);
db['Tag'] = require('./tag')(sequelize, Sequelize.DataTypes);

// create associations between tables
db['User'].associate(db);
db['Role'].associate(db);
db['Post'].associate(db);
db['Tag'].associate(db);

db.sequelize = sequelize;

module.exports = db;
