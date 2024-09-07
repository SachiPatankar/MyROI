const { EMIRecord, MonthlyPayment } = require('../models');

const calculateEMI = (loanAmount, annualRate, tenureMonths) => {
  const monthlyRate = annualRate / 12 / 100;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return emi;
};

exports.calculateEMI = async (req, res) => {
  const { loanAmount, interestRate, loanTenureMonths, prepaymentAmount } = req.body;
  let remainingBalance = loanAmount;
  let monthWisePayments = [];
  let emi = calculateEMI(loanAmount, interestRate, loanTenureMonths);

  const emiRecord = await EMIRecord.create({
    loan_amount: loanAmount,
    interest_rate: interestRate,
    loan_tenure_months: loanTenureMonths,
    emi: emi,
    prepayment_amount: prepaymentAmount || 0,
    remaining_balance: remainingBalance
  });

  for (let month = 1; month <= loanTenureMonths; month++) {
    let interestPaid = remainingBalance * (interestRate / 12 / 100);
    let principalPaid = emi - interestPaid;
    let prepayment = 0;

    if (prepaymentAmount && month === 1) {
      prepayment = prepaymentAmount;
      remainingBalance -= prepaymentAmount;
    }

    if (remainingBalance < principalPaid) {
      principalPaid = remainingBalance;
      emi = principalPaid + interestPaid;
    }

    remainingBalance -= principalPaid;

    const monthlyPayment = await MonthlyPayment.create({
      emiRecordId: emiRecord.id,
      month,
      emi_paid: Number(emi.toFixed(2)),
      interest_paid: Number(interestPaid.toFixed(2)),
      principal_paid: Number(principalPaid.toFixed(2)),
      prepayment: Number(prepayment.toFixed(2)),
      remaining_balance: Number(Math.max(remainingBalance, 0).toFixed(2))
    });

    monthWisePayments.push(monthlyPayment);

    if (remainingBalance <= 0) break;
  }

  await emiRecord.update({ remaining_balance: 0 });

  res.status(200).json({
    loanAmount,
    interestRate,
    loanTenureMonths,
    emi: monthWisePayments[0].emi_paid,
    prepayment: prepaymentAmount || 0,
    monthWisePayments
  });
};

exports.getEMIs = async (req, res) => {
  const records = await EMIRecord.findAll();
  res.status(200).json(records);
};


exports.getEMIById = async (req, res) => {
  const id = req.params.id;
  try {
    const record = await EMIRecord.findByPk(id, {
      include: [{ model: MonthlyPayment, as: 'monthlyPayments' }]
    });
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving EMI record', error: error.message });
  }
};