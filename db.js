const {Sequelize} = require('sequelize')

console.log(process.env.DATABASE_URL)
console.log(process.env.DATABASE_URL)
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DATABASE_URL ,
        port: process.env.DB_PORT

    }
)
