const Sequelize = require('sequelize');
const chalk = require('chalk');
const errorStyle = chalk.inverse.red;

//const env=require('../cong')


const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect:'mysql',
	//timezone: '+03:00', // for writing to database

});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to db has been established successfully.');
	})
	.catch(err => {
		console.error(errorStyle('Unable to connect to the database:'), err);
	});
module.exports={sequelize,Sequelize}