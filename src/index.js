const express = require('express');
const app = express();
const cors = require('cors');
// const path = require('path');
// const env = require('./cong');
const { sequelize } = require('./db/sequelize');


const port = process.env.PORT;
app.use(cors());
app.use(express.json());


app.listen(port, () => {
	console.log('Server ' + port + ' started!');
});