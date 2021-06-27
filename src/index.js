const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');

const errorStyle = chalk.inverse.red;
// const path = require('path');
// const env = require('./cong');
const { sequelize } = require('./db/sequelize');
const userRoute=require('./routes/user')

const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use(userRoute);


app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + 'client', 'index.html'));
});

app.listen(port, () => {
	console.log('Server ' + port + ' started!');
});
