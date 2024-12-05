const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');


// Create a new user (Registration)
const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return next(new HttpError('Invalid inputs, please check your info.', 422));
    }

    const { userFirstName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new HttpError('User already exists with this email.', 422));
      }

      const newUser = new User({
        userFirstName,
        email,
        password  // Store password as plaintext
      });

      await newUser.save();

      const responseUser = newUser.toObject({ getters: true });
      delete responseUser._id;
      delete responseUser.__v;
      delete responseUser.password;

      res.status(201).json({ user: responseUser });
    } catch (err) {
      const error = new HttpError('Creating user failed, please try again later.', 500);
      return next(error);
    }
};

exports.createUser = createUser;


//FOR ALL OTHER REQUESTS, ADD BELOW:

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password -__v -_id');
        res.json({ users: users.map(user => user.toObject()) });
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later', 500);
        return next(error);
    }
};


// Get users by first name
const getUsersByFirstName = async (req, res, next) => {
    const userFirstName = req.params.userFirstName;

    try {
        const users = await User.find({ userFirstName }, 'userFirstName userLastName email userId -_id');
        
        if (!users || users.length === 0) {
            return next(new HttpError("Could not find users with the given first name.", 404));
        }

        res.json({ users });
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }
};


// Get users by last name
const getUsersByLastName = async (req, res, next) => {
    const userLastName = req.params.userLastName;

    try {
        const users = await User.find({ userLastName }, 'userFirstName userLastName email userId -_id');

        if (!users || users.length === 0) {
            return next(new HttpError("Could not find users with the given last name.", 404));
        }


        res.json({ users });
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }
};


// Get a user by email
const getUserByEmail = async (req, res, next) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email }, '-password -__v -_id');

        if (!user) {
            return next(new HttpError("Could not find a user with the given email.", 404));
        }

        res.json({ user });
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }
};



// Get user by Id
const getUsersByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findOne({ userId }, '-password -__v -_id');
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }

    if (!user) {
        return next(new HttpError("Could not find a user with the given ID.", 404));
    }

    res.json({ user });
};


// Update user info
const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check your info.', 422));
    }

    const userId = req.params.userId;
    const updates = req.body;

    delete updates.userId;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next(new HttpError('User not found.', 404));
        }

        res.status(200).json({ 
            user: {
                userFirstName: updatedUser.userFirstName,
                userLastName: updatedUser.userLastName,
                email: updatedUser.email,
                userId: updatedUser.userId
            }
        });
    } catch (err) {
        return next(new HttpError('Updating failed, please try again.', 500));
    }
};


// Delete users
const deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOneAndDelete({ userId });
        if (!user) {
            const error = new HttpError('Could not find the user to delete.', 404);
            return next(error);
        }
        res.status(200).json({ message: "Deleted user." });
    } catch (err) {
        const error = new HttpError('Deleting user failed, please try again later.', 500);
        return next(error);
    }
};


exports.getAllUsers = getAllUsers
exports.getUsersByFirstName = getUsersByFirstName
exports.getUsersByLastName = getUsersByLastName
exports.getUserByEmail = getUserByEmail
exports.getUsersByUserId = getUsersByUserId
exports.createUser = createUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser