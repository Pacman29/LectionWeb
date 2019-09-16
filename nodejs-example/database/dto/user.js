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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 5,
                    msg: "Password must be atleast 5 characters in length"
                }
            }
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
