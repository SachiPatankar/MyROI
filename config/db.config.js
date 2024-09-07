require('dotenv').config();

module.exports = {
    HOST: 'localhost',
    USER: String(process.env.DB_USER).trim(),
    PASSWORD: String(process.env.DB_PASSWORD).trim(),
    DB: 'emi_calculator_db',
    dialect: 'postgres'
};

