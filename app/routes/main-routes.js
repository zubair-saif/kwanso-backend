
const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controller/users');
const LoginController = require('../controller/login');
const taskRoute = require('../controller/task');

router.post('/register', usersController.signUp);
router.post('/login', LoginController.sigIn);

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    usersController.VerifyUser);

// task routes
router.get('/list-task', taskRoute.getAll);
router.post('/create-task', taskRoute.create);


module.exports = router;