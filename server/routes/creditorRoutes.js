const express = require('express');
const router = express.Router();
const creditorController = require('../controllers/creditorController');

// /creditor/
router.get('/', creditorController.getAll, (req, res) => {
  return res.status(200).json(res.locals.data);
});

// /creditor
router.post('/', creditorController.createEntry, (req, res) => {
  return res.status(200).json();
});

// creditor
router.patch('/', creditorController.updateEntry, (req, res) => {
  return res.status(200).json(res.locals.updated);
});

// creditor/atrisk
router.get(
  '/atrisk',
  creditorController.getAll,
  creditorController.atRisk,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
