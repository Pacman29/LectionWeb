const article = (sequelize, DataTypes) => {
    return sequelize.define('articles',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.TEXT,
        },
        text: {
            type: DataTypes.TEXT,
        }
    })
};

export default article;
