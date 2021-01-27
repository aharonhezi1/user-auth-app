const express = require('express')
const { async } = require('validate.js')
const { User, Token } = require('../db/dbModels')
const router = new express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const errorStyle = chalk.inverse.red;


router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const hashPass = bcrypt.hashSync(req.body.password, 8);
        const user = await User.create({ ...req.body, password: hashPass })
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ where: { userName } })
        // console.log(user.password);
        const isValidPass = bcrypt.compareSync(password, user.password)
        if (user && !!isValidPass) {
            const token = jwt.sign({ userName }, process.env.JWT, { expiresIn: '24h' })
            console.log(token);
            await Token.create({ userName, token })
            res.send({ token, userName })
        } else {
            throw new Error({ error: 'wrong user name or password' })
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})

router.get('/authUser', async (req, res) => {
    try {
        const token = req.header('token')// .replace('Bearer ', '')
        const user = await Token.findOne({ where: { token } })
        const isValidToken = jwt.verify(token, process.env.JWT)
        if (isAuthUser && !!isValidToken) {
            res.send(user)
        } else {
            throw new Error({ error: 'unauthorized' })
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }

})
router.get('/iValidUserName', async (res, res) => {
    try {
        const { userName } = req.body;
        const userName = await User.findOne({ where: { userName } })
        if (userName) {
            throw new Error({ error: 'This user name already exists!' })
        } else {
            res.send()
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})
router.get('/iValidEmail', async (res, res) => {
    try {
        const { email } = req.body;
        const email = await User.findOne({ where: { email } })
        if (email) {
            throw new Error({ error: 'This email address already exists!' })
        } else {
            res.send()
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})

router.get('/', async (req, res) => {
    try {
        res.send({ success: 'yes' })
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})
module.exports = router