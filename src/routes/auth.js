const express = require('express');
const router = express.Router();    



const userController = require('../app/controllers/UserController');


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/createUser',userController.createUser)
router.get('/userLogin',userController.userLogin)




module.exports = router;
