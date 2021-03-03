const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const creditorSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  creditorName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  minPaymentPercentage: { type: Number },
  balance: { type: Number, required: true },
});

module.exports = mongoose.model('Creditor', creditorSchema);
