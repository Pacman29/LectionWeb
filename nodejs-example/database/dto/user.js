import crypto from "crypto";
import jwt from "jsonwebtoken";

export const UserTypes = {
    NONE: "NONE", WRITER: "WRITER", ADMIN: "ADMIN"
};

export function setPassword(user, password) {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex')

}

export function validatePassword(user, password){
    const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    return user.password === hash;
}

export function generateJWT(user) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: user.email,
        id: user.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

export function toAuthJSON(user) {
    return {
        id: user.id,
        email: user.email,
        token: generateJWT(user),
    };
}

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
    }, {
        setterMethods: {

        },
        getterMethods : {

        }
    })

};
export default user;
