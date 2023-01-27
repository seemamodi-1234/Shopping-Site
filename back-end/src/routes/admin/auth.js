const express = require('express');
const { signup, signin ,signout} = require('../../controller/admin/auth');
const {requireSignin} =require ('../../common-middleware');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup);

router.post('/admin/signout',signout);
module.exports =router;