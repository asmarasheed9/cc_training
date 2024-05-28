const app = require('./app');

const db = require('./src/models/index');

const {sequelize} = db;


sequelize.authenticate().then(() => {
    console.log('DB connected');

    sequelize.sync().then(() => {
        console.log('DB is UP now');

        /*// to create some basic role for testing
        db.Role.bulkCreate([{
            name: 'Admin'
        },
            {
                name: 'Non-Admin'
            },
            {
                name: 'helper'
            }]);*/
    });
    app.listen(4200, () => {
        console.log('app listening')
    })
}).catch((err) => {
    console.log('Database connection error ', err)
});
