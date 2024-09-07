const express = require('express');
const db = require('./models');
const emiRoutes = require('./routes/emi.routes');
const app = express();

require('dotenv').config();

app.use(express.json());

db.sequelize.sync();

app.use('/api', emiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
