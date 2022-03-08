const express = require('express');
const app = express();
const port = 8000;
const db = require('./db');
app.get('/test/get/ok', (req, res) => {
  res.send({
    code: 200,
    message: '成功',
  });
});

app.get('/test/get/error', (req, res) => {
  res.sendStatus(404);
});

app.get('/change/status', (req, res) => {
  res.send({
    code: 200,
    message: '成功',
  });
});

app.get('change/status/error', (req, res) => {
  res.sendStatus(404);
});

app.get('/flights', (req, res) => {
  if (req.query.date === '2022-3-8') {
    res.send(db.getFlightList200);
  } else {
    res.send(db.getFlightList200Empty);
  }
});

app.post('/book-flight-contracts', (req, res) => {
  res.send(db.bookFlights200);
});

app.post('/save-passenger', (req, res) => {
  res.send(db.savePasserger200);
});

app.get('/get-passenger-list', (req, res) => {
  res.send(db.getPassengerList401);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
