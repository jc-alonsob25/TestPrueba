const express = require('express');
const app = express();

var user_routes = require("./routes/User");
var attendance_routes = require("./routes/Attendance");

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Corriendo correctamente...');
});

app.use('/api_payroll/users', user_routes);
app.use('/api_payroll/attendance', attendance_routes);

module.exports = app;