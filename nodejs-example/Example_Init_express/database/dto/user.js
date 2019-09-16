export const UserTypes = {
    NONE: "NONE", WRITER: "WRITER", ADMIN: "ADMIN"
};

const user = (sequelize, DataTypes) => {
    return sequelize.define('users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT(1024),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.ENUM(Object.values(UserTypes)),
            default: UserTypes.NONE,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: {
                msg: "Email address must be valid"
            },
        }
    })

};
export default user;
