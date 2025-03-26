const express = require('express');
const app = express();
var userController = require("../controllers/user");

app.post('/create/v1', userController.save);
app.delete('/delete/v1/:keyUser', userController.deleteUser);

module.exports = app;