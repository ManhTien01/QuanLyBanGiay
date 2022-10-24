const User = require('../models/User')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
    async register(req, res) {
       
        const emailExist = await User.findOne({email: req.body.email})

        //check exist Email
        if(emailExist) {
            return res.status(400).send('Email is already exist')
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword  =  await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        try {
            const savedUser = await user.save()
            res.send({user: user._id})
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async login(req, res) {
        //check exist Email
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(400).send('Email is not found')
        }
        //password correct
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(400).send('invalid password')

        const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
        res.header('auth-token',token).send(token)
    }

    createUser(req, res, next) {
        res.render('auth/register')
    }

    userLogin(req, res, next) {
        res.render('auth/login')
    }
}


module.exports = new UserController()