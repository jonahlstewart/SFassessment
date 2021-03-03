const Creditor = require('../models/creditorModel');

const creditorController = {};

creditorController.createEntry = (req, res, next) => {
  const newEntry = {
    id: req.body.id,
    creditorName: req.body.creditorName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    minPaymentPercentage: req.body.minPaymentPercentage || null,
    balance: req.body.balance,
  };

  Creditor.create(newEntry, (err, entry) => {
    if (entry === undefined) return res.json(false);
    if (err) {
      // send back to login page
      next({
        log: 'Error in creditorController.createEntry, Creditor.create',
        message: { Error: 'Error in Creditor.create' },
      });
    }

    return next();
  });
};

creditorController.getAll = (req, res, next) => {
  // if the client requests a specific creditor, we return those entries
  if (req.body.creditorName) {
    Creditor.find({ creditorName: req.body.creditorName }, (err, data) => {
      if (err) return next(err);

      if (!data) return res.json(false);
      res.locals.data = data;
      return next();
    });
    // if no specific creditor is requested, we return all entries
  } else {
    Creditor.find({}, (err, data) => {
      if (err) return next(err);

      if (!data) return res.json(false);
      res.locals.data = data;
      return next();
    });
  }
};

creditorController.atRisk = (req, res, next) => {
  let data = res.locals.data;

  data = data.filter((creditor) => {
    if (creditor.balance >= 2000 && creditor.minPaymentPercentage < 30)
      return creditor;
  });

  res.locals.data = data;
  return next();
};

creditorController.updateEntry = (req, res, next) => {
  if (!req.body.id)
    return res.json(
      'Please provide the id of the entry you would like to update.'
    );

  Creditor.findOneAndUpdate(
    { id: req.body.id },
    { ...req.body },
    { new: true, upsert: true },
    (err, entry) => {
      if (err) {
        return next(err);
      }

      res.locals.updated = entry;
      return next();
    }
  );
};

module.exports = creditorController;
