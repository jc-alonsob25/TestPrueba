const express = require('express');
const app = express();
var attendanceController = require('../controllers/attendance');

app.post('/checkInCheckOut/v1/:keyUser', attendanceController.checkInCheckOut);
app.post('/calculatePayRoll/v1/:keyUser', attendanceController.calculatePayRoll);

module.exports = app;