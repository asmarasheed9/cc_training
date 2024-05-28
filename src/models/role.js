module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define(
        'Role',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }
    );
    role.associate = (models) => {
        role.hasOne(models.User, {
            foreignKey: {
                name: 'roleId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }
    return role;
}