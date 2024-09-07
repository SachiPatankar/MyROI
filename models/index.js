const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');
const emiModel = require('./emi.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const { EMIRecord, MonthlyPayment, associate } = emiModel(sequelize, Sequelize.DataTypes);

db.EMIRecord = EMIRecord;
db.MonthlyPayment = MonthlyPayment;

// Call the associate function to establish relationships
associate(db);

module.exports = db;