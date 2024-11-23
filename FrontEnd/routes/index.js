const express = require('express');
const { check } = require('express-validator'); 
const usersControllers = require('../controllers/users-controllers');
const router = express.Router();

router.get('/home', function(req,res,next)
{
    res.render("index");
})

