module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define(
        'Post',
        {
            post_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
    post.associate = (models) => {
        post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        post.belongsToMany(models.Tag, {
            through: 'post_tag',
            foreignKey: 'postId',
            otherKey: 'tagId',
            timestamps: false
        });
    };
    return post;
}