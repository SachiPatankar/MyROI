module.exports = (sequelize, DataTypes) => {
  const EMIRecord = sequelize.define('EMIRecord', {
    loan_amount: { type: DataTypes.DECIMAL(15, 2) },
    interest_rate: { type: DataTypes.DECIMAL(5, 2) },
    loan_tenure_months: { type: DataTypes.INTEGER },
    emi: { type: DataTypes.DECIMAL(15, 2) },
    prepayment_amount: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    remaining_balance: { type: DataTypes.DECIMAL(15, 2) }
  });

  const MonthlyPayment = sequelize.define('MonthlyPayment', {
    month: DataTypes.INTEGER,
    emi_paid: DataTypes.DECIMAL(15, 2),
    interest_paid: DataTypes.DECIMAL(15, 2),
    principal_paid: DataTypes.DECIMAL(15, 2),
    prepayment: DataTypes.DECIMAL(15, 2),
    remaining_balance: DataTypes.DECIMAL(15, 2)
  });

  const associate = (models) => {
    models.EMIRecord.hasMany(models.MonthlyPayment, {
      foreignKey: 'emiRecordId',
      as: 'monthlyPayments'
    });
    models.MonthlyPayment.belongsTo(models.EMIRecord, {
      foreignKey: 'emiRecordId',
      as: 'emiRecord'
    });
  };

  return {
    EMIRecord,
    MonthlyPayment,
    associate
  };
};