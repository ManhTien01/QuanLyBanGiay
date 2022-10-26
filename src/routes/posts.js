const express = require('express');
const { token } = require('morgan');
const router = express.Router();
const verify = require('./verifyToken')


router.get('/test',verify, (req, res) => {
    res.header('auth-token').send(req.user)

   
})

module.exports = router;
