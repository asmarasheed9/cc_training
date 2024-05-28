module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define(
        'Tag',
        {
            tag_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            tag_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
    tag.associate = (models) => {
        tag.belongsToMany(models.Post, {
            through: 'post_tag',
            foreignKey: 'postId',
            otherKey: 'tagId',
            timestamps: false
        });
    };
    return tag;
}