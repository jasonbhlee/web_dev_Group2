const express = require('express');
const { check } = require('express-validator'); 
const usersControllers = require('../controllers/users-controllers');
const router = express.Router();

router.get('/', function(req,res,next)
{
    res.render('./views/index');
})

router.get('/projects', function(req,res,next)
{
    res.render('./views/projects');
})

router.get('/signin', function(req,res,next)
{
    res.render('./views/signin');
})

router.get('/register', function(req,res,next)
{
    res.render('./views/register');
})

module.exports = router;