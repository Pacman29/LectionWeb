const user = (sequelize, DataTypes) => {
    return sequelize.define('users',{
        name: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    })

};
export default user;