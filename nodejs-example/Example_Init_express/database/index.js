import Sequelize from 'sequelize';

console.log(`DBHOST ${process.env.DBHOST}`);
console.log(`DBPORT ${process.env.DBPORT}`);

const sequelize = new Sequelize('people', 'example', 'example', {
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || '5432',
    dialect: 'postgres',
});

const models = {
    Users: sequelize.import('./dto/user'),
    Articles: sequelize.import('./dto/article')
};

models.Users.hasMany(models.Articles);
models.Articles.belongsTo(models.Users);

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
