const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const creditorRouter = require('./routes/creditorRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const PORT = 3000;

mongoose.connect(
  'mongodb+srv://SFUser:SFPassword@cluster0.sllcc.mongodb.net/cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const db = mongoose.connection;
db.on('error', (error) => console.error(error.message));
db.once('open', () => console.log('Connected to Database'));

// routes all requests to /creditor to creditor Router
app.use('/creditor', creditorRouter);

// responds with page not found for requests to any other pages
app.use('*', (req, res) => {
  res.status(404).send('page not found!');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
