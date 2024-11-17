const express = require('express');
const { check } = require('express-validator'); 
const usersControllers = require('../controllers/users-controllers');
const router = express.Router();

router.get("/firstname/:userFirstName", usersControllers.getUsersByFirstName);
router.get("/lastname/:userLastName", usersControllers.getUsersByLastName);
router.get("/email/:email", usersControllers.getUserByEmail);
router.get("/id/:userId", usersControllers.getUsersByUserId);
router.get("/getAll", usersControllers.getAllUsers);


router.post(
    '/create',
    [
        check("userFirstName").not().isEmpty().isLength({ min: 3 }),
        check("userLastName").not().isEmpty().isLength({ min: 3 }),
        check("email").not().isEmpty().isEmail(),
        check("userId").not().isEmpty().isLength({ min: 3 }),
        check("password").not().isEmpty().isLength({ min: 3})
    ], 
    usersControllers.createUser
);


router.patch(
    '/:userId',
    [
        check("userFirstName").optional().isLength({ min: 3 }),
        check("userLastName").optional().isLength({ min: 3 }),
        check("email").optional().isEmail().isLength({ min: 3 }),
        check("password").optional().isLength({ min: 3})
    ],
    usersControllers.updateUser
);


router.patch('/id/:userId', usersControllers.updateUser);
router.delete('/delete/:userId', usersControllers.deleteUser);

module.exports = router;

