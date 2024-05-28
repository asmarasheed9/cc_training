const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'User',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    const hash = bcrypt.hashSync(value, 10);
                    this.setDataValue('password', hash);
                }
            }
        },
    );
    user.associate = (models) => {
        user.belongsTo(models.Role, {
            foreignKey: {
                name: 'roleId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        user.hasMany(models.Post, {
            foreignKey: {
                name: 'userId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

    };
    return user;
}