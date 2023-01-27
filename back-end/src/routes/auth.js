const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();


router.post('/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);


module.exports =router;